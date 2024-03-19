import Filter from '@/components/commons/Filter';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Tab&Filter/Filter',
  component: Filter,
} satisfies Meta<typeof Filter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    items: [
      { id: '0', text: '전체' },
      { id: '1', text: '신청' },
      { id: '2', text: '취소' },
      { id: '3', text: '승인' },
      { id: '4', text: '거절' },
    ],
    selectedFilterId: '0',
  },
};
