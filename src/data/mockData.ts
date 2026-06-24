import type { Comment, Post, Tag, User } from '../types';
import { hoursAgo as hAgo } from '../utils/time';

const hoursAgo = (h: number) => hAgo(h);

export const mockUsers: User[] = [
  { id: 1, nickName: 'xX_root_Xx', email: 'root@antisocial.net', career: 'Lic. en Sistemas' },
  { id: 2, nickName: 'null_pointer', email: 'null@dev.local', career: 'Tecnicatura en Programación' },
  { id: 3, nickName: 'git_push_carla', email: 'carla@unahur.edu.ar', career: 'Construcción de Interfaces' },
];

export const mockTags: Tag[] = [
  { id: 1, name: '#tech' },
  { id: 2, name: '#linux' },
  { id: 3, name: '#gaming' },
  { id: 4, name: '#random' },
];

export const mockPosts: Post[] = [
  {
    id: 1,
    description:
      'Acabo de compilar el kernel de Linux en mi tostadora. Solo tardó 47 horas. El pan salió crujiente y el sistema operativo, estable. Recomiendo arch btw.',
    userId: 1,
    tags: [mockTags[0], mockTags[1]],
    images: ['https://picsum.photos/seed/linux1/800/500'],
    commentCount: 3,
    user: mockUsers[0],
    createdAt: hoursAgo(2),
    likes: 12,
  },
  {
    id: 2,
    description:
      'Mi compañero de lab preguntó por qué mi código tiene 47 try-catch anidados. Le dije que es programación defensiva. En realidad no sé qué hace el programa.',
    userId: 2,
    tags: [mockTags[0], mockTags[3]],
    commentCount: 3,
    user: mockUsers[1],
    createdAt: hoursAgo(5),
    likes: 8,
  },
  {
    id: 3,
    description:
      'Speedrun de Dark Souls mientras espero que npm install termine. Llevo 3 horas en ambos. El juego ya lo pasé dos veces. npm sigue en 847/2847 paquetes.',
    userId: 3,
    tags: [mockTags[2], mockTags[3]],
    images: ['https://picsum.photos/seed/gaming1/800/500', 'https://picsum.photos/seed/gaming2/800/500'],
    commentCount: 3,
    user: mockUsers[2],
    createdAt: hoursAgo(8),
    likes: 24,
  },
  {
    id: 4,
    description:
      'Hoy en clase de BD el profe dijo "normalicen sus tablas". Yo normalicé mi vida social a 0NF. Sin redundancia, sin relaciones.',
    userId: 1,
    tags: [mockTags[0], mockTags[3]],
    commentCount: 3,
    user: mockUsers[0],
    createdAt: hoursAgo(14),
    likes: 31,
  },
  {
    id: 5,
    description:
      'Instalé Neovim. Después de 6 meses ya sé cómo salir. :wq cambió mi vida. Ahora busco trabajo como "vim evangelist".',
    userId: 2,
    tags: [mockTags[1], mockTags[0]],
    images: ['https://picsum.photos/seed/vim1/800/500'],
    commentCount: 3,
    user: mockUsers[1],
    createdAt: hoursAgo(20),
    likes: 17,
  },
  {
    id: 6,
    description:
      'Mi setup: 3 monitores, teclado mecánico, mouse gaming, y una planta muerta que simboliza mi motivación los lunes. El RGB de la planta no funciona.',
    userId: 3,
    tags: [mockTags[2], mockTags[0]],
    images: ['https://picsum.photos/seed/setup1/800/500'],
    commentCount: 3,
    user: mockUsers[2],
    createdAt: hoursAgo(26),
    likes: 42,
  },
];

export const mockComments: Comment[] = [
  { id: 1, content: '¿Arch o Gentoo? Necesito saber antes de juzgar.', postId: 1, userId: 2, user: mockUsers[1], visible: true },
  { id: 2, content: 'Mi tostadora solo corre Windows ME. Envidia.', postId: 1, userId: 3, user: mockUsers[2], visible: true },
  { id: 3, content: 'sudo make me a sandwich', postId: 1, userId: 1, user: mockUsers[0], visible: true },
  { id: 4, content: 'Eso no es defensivo, es paranoico. Aprobado.', postId: 2, userId: 1, user: mockUsers[0], visible: true },
  { id: 5, content: '¿Has probado console.log("here") en cada línea?', postId: 2, userId: 3, user: mockUsers[2], visible: true },
  { id: 6, content: 'El verdadero try-catch es la vida misma.', postId: 2, userId: 2, user: mockUsers[1], visible: true },
  { id: 7, content: 'npm install es el boss final de la programación.', postId: 3, userId: 1, user: mockUsers[0], visible: true },
  { id: 8, content: 'Usá pnpm, viví mejor.', postId: 3, userId: 2, user: mockUsers[1], visible: true },
  { id: 9, content: 'GG WP. ¿Cuántas muertes en Dark Souls?', postId: 3, userId: 3, user: mockUsers[2], visible: true },
  { id: 10, content: '0NF: Zero Normal Form. Filosofía pura.', postId: 4, userId: 2, user: mockUsers[1], visible: true },
  { id: 11, content: 'DROP TABLE social_life; -- sin rollback', postId: 4, userId: 3, user: mockUsers[2], visible: true },
  { id: 12, content: 'Mi FK apunta a nadie. Literalmente.', postId: 4, userId: 1, user: mockUsers[0], visible: true },
  { id: 13, content: ':q! es para cobardes. Fight me.', postId: 5, userId: 3, user: mockUsers[2], visible: true },
  { id: 14, content: 'Emacs > Vim. Prepará el debate.', postId: 5, userId: 1, user: mockUsers[0], visible: true },
  { id: 15, content: 'Los dos son editores. Yo uso notepad. Sigma.', postId: 5, userId: 2, user: mockUsers[1], visible: true },
  { id: 16, content: 'La planta necesita RGB. Prioridades.', postId: 6, userId: 1, user: mockUsers[0], visible: true },
  { id: 17, content: '¿Cuántos FPS tiene tu escritorio?', postId: 6, userId: 2, user: mockUsers[1], visible: true },
  { id: 18, content: 'Setup aprobado. Falta un cable suelto para el aesthetic.', postId: 6, userId: 3, user: mockUsers[2], visible: true },
];

export function getPostById(id: number): Post | undefined {
  return mockPosts.find((p) => p.id === id);
}

export function getCommentsByPostId(postId: number): Comment[] {
  return mockComments.filter((c) => c.postId === postId && c.visible);
}

export function getPostsByUserId(userId: number): Post[] {
  return mockPosts.filter((p) => p.userId === userId);
}

export function getUserByNickName(nickName: string): User | undefined {
  return mockUsers.find(
    (u) => u.nickName.toLowerCase() === nickName.toLowerCase(),
  );
}

export function getLatestComments(limit = 5): Comment[] {
  return [...mockComments].reverse().slice(0, limit);
}

export function filterPostsByTag(tagName: string | null): Post[] {
  if (!tagName) return mockPosts;
  const normalized = tagName.toLowerCase();
  return mockPosts.filter((p) =>
    p.tags.some((t) => t.name.toLowerCase() === normalized),
  );
}
