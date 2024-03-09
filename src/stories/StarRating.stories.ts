import StarRating from '@/components/commons/StarRating';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'StarRating',
  component: StarRating,
} satisfies Meta<typeof StarRating>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    size: 'medium',
    rating: 2,
    readonly: false,
  },
};
