export type MyNotifications = {
  cursorId: number;
  notifications: Notification[];
  totalCount: number;
};

export type Notification = {
  id: number;
  teamId: string;
  userId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};
