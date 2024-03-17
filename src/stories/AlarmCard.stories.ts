import AlarmCard from '@/components/layout/header/AlarmCard';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Layout/Header/AlarmCard',
  component: AlarmCard,
} satisfies Meta<typeof AlarmCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    id: 0,
    content: '함께하면 즐거운 스트릿 댄스(2023-03-15 15:00~18:00) 예약이 승인되었어요.',
    createdAt: '2024-03-15T14:25:59.858Z',
  },
};
