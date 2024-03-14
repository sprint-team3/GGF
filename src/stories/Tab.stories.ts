import { Tab } from '@/components/commons/Tab';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Tab&Filter/Tab',
  component: Tab,
} satisfies Meta<typeof Tab>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Medium_Example: Story = {
  args: {
    items: [
      { id: 'total', text: '전체' },
      { id: 'myPost', text: '등록한 게시글' },
      { id: 'myReservation', text: '신청한 예약' },
    ],
    size: 'medium',
    selectedTabId: 'total',
  },
};

export const Small_Example: Story = {
  args: {
    items: [
      { id: 'pending', text: '신청', count: 0 },
      { id: 'accept', text: '승인', count: 10 },
      { id: 'deny', text: '거절', count: 20 },
    ],
    size: 'small',
    selectedTabId: 'pending',
  },
};
