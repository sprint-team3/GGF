import AlarmList from '@/components/layout/header/AlarmList';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Layout/Header/AlarmList',
  component: AlarmList,
} satisfies Meta<typeof AlarmList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    totalCount: 5,
    notifications: [
      {
        id: 0,
        teamId: 'string',
        userId: 0,
        content: '함께하면 즐거운 스트릿 댄스(2023-03-15 15:00~18:00) 예약이 승인되었어요.',
        createdAt: '2024-03-15T14:25:59.858Z',
        updatedAt: '2024-03-15T14:25:59.858Z',
        deletedAt: '2024-03-15T14:25:59.858Z',
      },
      {
        id: 1,
        teamId: 'string',
        userId: 0,
        content: '함께하면 즐거운 스트릿 댄스(2023-03-15 15:00~18:00) 예약이 승인되었어요.',
        createdAt: '2024-03-15T14:25:59.858Z',
        updatedAt: '2024-03-15T14:25:59.858Z',
        deletedAt: '2024-03-15T14:25:59.858Z',
      },
      {
        id: 2,
        teamId: 'string',
        userId: 0,
        content: '함께하면 즐거운 스트릿 댄스(2023-03-15 15:00~18:00) 예약이 승인되었어요.',
        createdAt: '2024-03-15T14:25:59.858Z',
        updatedAt: '2024-03-15T14:25:59.858Z',
        deletedAt: '2024-03-15T14:25:59.858Z',
      },
      {
        id: 3,
        teamId: 'string',
        userId: 0,
        content: '함께하면 즐거운 스트릿 댄스(2023-03-15 15:00~18:00) 예약이 승인되었어요.',
        createdAt: '2024-03-15T14:25:59.858Z',
        updatedAt: '2024-03-15T14:25:59.858Z',
        deletedAt: '2024-03-15T14:25:59.858Z',
      },
      {
        id: 4,
        teamId: 'string',
        userId: 0,
        content: '함께하면 즐거운 스트릿 댄스(2023-03-15 15:00~18:00) 예약이 승인되었어요.',
        createdAt: '2024-03-15T14:25:59.858Z',
        updatedAt: '2024-03-15T14:25:59.858Z',
        deletedAt: '2024-03-15T14:25:59.858Z',
      },
    ],
    alarmListRef: { current: null },
  },
};
