import type { Post, Tag } from '../types';

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

export async function getPosts(): Promise<Post[]> {
  const res = await fetch(`${BASE_URL}/posts`);
  if (!res.ok) throw new Error('Error al obtener publicaciones');
  const data = await res.json();
  return data.map(mapPost);
}

export async function getTags(): Promise<Tag[]> {
  const res = await fetch(`${BASE_URL}/tags`);
  if (!res.ok) throw new Error('Error al obtener etiquetas');
  return res.json();
}
