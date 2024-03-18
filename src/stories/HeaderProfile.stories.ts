import HeaderProfile from '@/components/layout/header/HeaderProfile';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Layout/Header/HeaderProfile',
  component: HeaderProfile,
} satisfies Meta<typeof HeaderProfile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    nickname: '테스트',
    profileImageUrl: '',
    isActivated: false,
    headerProfileRef: { current: null },
  },
};
