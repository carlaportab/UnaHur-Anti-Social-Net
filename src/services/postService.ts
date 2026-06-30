import type { Comment, Post, Tag } from '../types';

const BASE_URL = 'http://localhost:3001';

function mapPost(raw: any): Post {
  return {
    id: raw.id,
    description: raw.description,
    userId: raw.UserId ?? raw.userId,
    tags: (raw.Tags ?? raw.tags ?? []).map((t: any) => ({ id: t.id, name: t.name })),
    images: [],
    commentCount: 0,
    user: raw.User
      ? { id: raw.User.id, nickName: raw.User.nickName, email: raw.User.email }
      : undefined,
    createdAt: raw.createdAt,
  };
}

function mapComment(raw: any): Comment {
  return {
    id: raw.id,
    content: raw.content,
    postId: raw.PostId ?? raw.postId,
    userId: raw.UserId ?? raw.userId,
    visible: true,
    user: raw.User
      ? { id: raw.User.id, nickName: raw.User.nickName, email: raw.User.email }
      : undefined,
  };
}

export async function getPosts(): Promise<Post[]> {
  const res = await fetch(`${BASE_URL}/posts`);
  if (!res.ok) throw new Error('Error al obtener publicaciones');
  const data = await res.json();
  return data.map(mapPost);
}

export async function getPostsByUserId(userId: number): Promise<Post[]> {
  const res = await fetch(`${BASE_URL}/posts?userId=${userId}`);
  if (!res.ok) throw new Error('Error al obtener las publicaciones del usuario');
  const data = await res.json();
  return data.map(mapPost);
}

export async function getPostById(id: number): Promise<Post> {
  const res = await fetch(`${BASE_URL}/posts/${id}`);
  if (!res.ok) throw new Error('Post no encontrado');
  return mapPost(await res.json());
}

export async function getPostImages(postId: number): Promise<string[]> {
  const res = await fetch(`${BASE_URL}/postimages/post/${postId}`);
  if (!res.ok) return [];
  const data = await res.json();
  return data.map((img: any) => img.url);
}

export async function getCommentsByPostId(postId: number): Promise<Comment[]> {
  const res = await fetch(`${BASE_URL}/comments/post/${postId}`);
  if (!res.ok) return [];
  const data = await res.json();
  return data.map(mapComment);
}

export async function createComment(data: {
  content: string;
  userId: number;
  postId: number;
}): Promise<Comment> {
  const res = await fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? 'No se pudo enviar el comentario');
  }
  return mapComment(await res.json());
}

export async function getTags(): Promise<Tag[]> {
  const res = await fetch(`${BASE_URL}/tags`);
  if (!res.ok) throw new Error('Error al obtener etiquetas');
  return res.json();
}
