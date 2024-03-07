import Badge from '@/components/commons/Badge';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Badge',
  component: Badge,
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    status: 'pending',
  },
};
