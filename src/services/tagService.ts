import { envs } from "../config/environments";
import type { Tag } from "../types";

export async function getTags(): Promise<Tag[]> {
  const res = await fetch(`${envs.BASE_URL}/tags`);
  if (!res.ok) throw new Error("Error al obtener tags");
  return res.json();
}
