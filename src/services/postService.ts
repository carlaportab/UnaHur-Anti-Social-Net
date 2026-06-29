import { envs } from "../config/environments";
import type { Post } from "../types";

export async function getPosts(userId?: number): Promise<Post[]> {
  const res = await fetch(
    `${envs.BASE_URL}/posts${userId ? `?userId=${userId}` : ""}`,
  );
  if (!res.ok) throw new Error("Error al obtener posts");
  return res.json();
}

export async function createPost(data: {
  description: string;
  userId: number;
  tagIds?: number[];
}): Promise<Post> {
  const res = await fetch(`${envs.BASE_URL}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? "No se pudo crear el post");
  }

  return res.json();
}

export async function getPostById(postId: number): Promise<Post> {
  const res = await fetch(`${envs.BASE_URL}/posts/${postId}`);
  if (!res.ok) throw new Error("Error al obtener el post");
  return res.json();
}
