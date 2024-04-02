import DrawerMenu from '@/components/layout/header/DrawerMenu';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Layout/Header/DrawerMenu',
  component: DrawerMenu,
} satisfies Meta<typeof DrawerMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {},
};
