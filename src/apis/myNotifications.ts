import { MY_NOTIFICATIONS_API, DEFAULT_PAGE_SIZE } from '@/constants';

import instance from './axios';

export const MyNotifications = {
  get: () =>
    instance.get(MY_NOTIFICATIONS_API, {
      params: {
        size: DEFAULT_PAGE_SIZE,
      },
    }),

  delete: (notificationId: number) => instance.delete(`${MY_NOTIFICATIONS_API}/${notificationId}`),
};
