export type MyNotifications = {
  cursorId: number;
  notifications: NotificationResponse[];
  totalCount: number;
};

export type NotificationResponse = {
  id: number;
  teamId: string;
  userId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};
