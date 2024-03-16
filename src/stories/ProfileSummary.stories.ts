import ProfileSummary from '@/components/commons/ProfileSummary';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'ProfileSummary',
  component: ProfileSummary,
} satisfies Meta<typeof ProfileSummary>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    nickname: 'BattleMan',
    email: 'codeit@codeit.com',
    profileImageUrl: null,
    recruitmentTotalCount: 6,
    reservationTotalCount: 19,
  },
};
