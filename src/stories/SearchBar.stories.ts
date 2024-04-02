import { Meta, StoryObj } from '@storybook/react';

import { SearchBar } from '@/components/commons/inputs';

const meta = {
  title: 'inputs/SearchBar',
  component: SearchBar,
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    placeholder: '검색어를 입력하세요',
    maxLength: 20,
  },
};
