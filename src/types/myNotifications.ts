export type MyNotifications = {
  cursorId: number;
  notifications: MyNotificationsNotification[];
  totalCount: number;
};

export type MyNotificationsNotification = {
  id: number;
  teamId: string;
  userId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};
