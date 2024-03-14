import Filter from '@/components/commons/Filter';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Filter',
  component: Filter,
} satisfies Meta<typeof Filter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    items: [
      { id: 'total', text: '전체' },
      { id: 'lol', text: '리그오브레전드' },
      { id: 'pubg', text: '배틀그라운드' },
      { id: 'overwatch', text: '오버워치 2' },
      { id: 'minecraft', text: '마인크래프트' },
    ],
    selectedFilterId: 'total',
  },
};
