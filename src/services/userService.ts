import type { User } from '../types';

const BASE_URL = 'http://localhost:3001';

export async function getUsers(): Promise<User[]> {
  const res = await fetch(`${BASE_URL}/users`);
  if (!res.ok) throw new Error('Error al obtener usuarios');
  return res.json();
}

export async function createUser(data: {
  nickName: string;
  email: string;
}): Promise<User> {
  const res = await fetch(`${BASE_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? 'No se pudo crear el usuario');
  }

  return res.json();
}
