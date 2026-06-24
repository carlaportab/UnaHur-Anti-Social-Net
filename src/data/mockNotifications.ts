import { hoursAgo } from '../utils/time';
import type { AppNotification } from '../types/notification';

export const mockNotifications: AppNotification[] = [
  {
    id: 1,
    type: 'comment',
    message: '@null_pointer comentó tu post sobre el kernel',
    link: '/post/1',
    read: false,
    createdAt: hoursAgo(0.5),
  },
  {
    id: 2,
    type: 'mention',
    message: '@xX_root_Xx te mencionó en #linux',
    link: '/post/5',
    read: false,
    createdAt: hoursAgo(1),
  },
  {
    id: 3,
    type: 'follow',
    message: '@git_push_carla empezó a seguirte (mentira, es mock)',
    link: '/usuario/git_push_carla',
    read: false,
    createdAt: hoursAgo(3),
  },
  {
    id: 4,
    type: 'system',
    message: 'Nuevo tag trending: #gaming',
    link: '/explorar?tag=%23gaming',
    read: true,
    createdAt: hoursAgo(6),
  },
  {
    id: 5,
    type: 'comment',
    message: '@xX_root_Xx respondió: "sudo make me a sandwich"',
    link: '/post/1',
    read: true,
    createdAt: hoursAgo(12),
  },
];
