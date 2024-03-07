import { BaseButton } from '@/components/commons/buttons/BaseButton';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Buttons/BaseButton',
  component: BaseButton,
} satisfies Meta<typeof BaseButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: {
    size: 'small',
    text: '테스트',
  },
};

export const Middle: Story = {
  args: {
    size: 'middle',
    text: '테스트',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    text: '테스트',
  },
};
