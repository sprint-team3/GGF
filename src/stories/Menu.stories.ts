import Menu from '@/components/layout/header/Menu';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Layout/Header/Menu',
  component: Menu,
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {},
};
