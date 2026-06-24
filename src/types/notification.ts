export type NotificationType = 'comment' | 'follow' | 'mention' | 'system';

export interface AppNotification {
  id: number;
  type: NotificationType;
  message: string;
  link: string;
  read: boolean;
  createdAt: string;
}
