import UserMenu from '@/components/layout/header/UserMenu';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Layout/Header/UserMenu',
  component: UserMenu,
} satisfies Meta<typeof UserMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    profileImageUrl: '',
    nickname: '테스트',
    email: '테스트@test.com',
    userMenuRef: { current: null },
  },
};
