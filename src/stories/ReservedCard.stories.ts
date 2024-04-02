import { ReservedCard } from '@/components/commons/cards';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Cards/ReservedCard',
  component: ReservedCard,
} satisfies Meta<typeof ReservedCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    reservationId: 0,
    path: '/',
    status: 'pending',
    reviewSubmitted: false,
    postType: 'offline',
    title: '[PC방 대회]리그 오브 레전드 개발자들의 PC방 습격!',
    address: '강남 SBXG 포탈 PC방',
    category: '리그오브레전드',
    date: '2024-03-13',
    startTime: '17:00',
    endTime: '18:00',
    createdAt: '2024-03-13T04:44:02.924Z',
  },
};
