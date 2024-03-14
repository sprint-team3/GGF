import Tag from '@/components/commons/Tag';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Badge&Tag/Tag',
  component: Tag,
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    postType: 'offline',
  },
};
