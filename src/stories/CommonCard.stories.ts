import CommonCard from '@/components/commons/cards/CommonCard';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Cards/CommonCard',
  component: CommonCard,
} satisfies Meta<typeof CommonCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    path: '/',
    postType: 'offline',
    title: '[PC방 대회]리그 오브 레전드 개발자들의 PC방 습격!',
    rating: 4,
    reviewCount: 67,
    address: '강남 SBXG 포탈 PC방',
    createdAt: '2024-03-13T04:44:02.924Z',
  },
};
