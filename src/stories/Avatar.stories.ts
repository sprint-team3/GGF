import { Avatar } from '@/components/commons/Avatar';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Avatar',
  component: Avatar,
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    size: 'medium',
    profileImageUrl: null,
  },
};
