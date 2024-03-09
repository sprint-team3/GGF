import ReviewCard from '@/components/commons/ReviewCard';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'ReviewCard',
  component: ReviewCard,
} satisfies Meta<typeof ReviewCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    user: {
      profileImageUrl: null,
      nickname: 'CheeseB',
      id: 1,
    },
    rating: 2,
    createdAt: '2024-03-09T16:20:00.474Z',
    content: 'GG!',
  },
};
