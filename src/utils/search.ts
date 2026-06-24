import type { Post, Tag, User } from '../types';
import { mockPosts, mockTags, mockUsers } from '../data/mockData';

export interface SearchResults {
  users: User[];
  posts: Post[];
  tags: Tag[];
  query: string;
}

export function searchAll(query: string): SearchResults {
  const q = query.trim().toLowerCase();
  if (!q) return { users: [], posts: [], tags: [], query: q };

  const tagQuery = q.startsWith('#') ? q : `#${q}`;

  const users = mockUsers.filter(
    (u) =>
      u.nickName.toLowerCase().includes(q) ||
      u.email?.toLowerCase().includes(q),
  );

  const posts = mockPosts.filter(
    (p) =>
      p.description.toLowerCase().includes(q) ||
      p.user?.nickName.toLowerCase().includes(q) ||
      p.tags.some((t) => t.name.toLowerCase().includes(q)),
  );

  const tags = mockTags.filter(
    (t) =>
      t.name.toLowerCase().includes(q) ||
      t.name.toLowerCase().includes(tagQuery),
  );

  return { users, posts, tags, query: q };
}
