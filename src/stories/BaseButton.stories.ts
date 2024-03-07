import { BaseButton } from '@/components/commons/buttons/BaseButton';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Buttons/BaseButton',
  component: BaseButton,
} satisfies Meta<typeof BaseButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    size: 'small',
    text: '테스트',
  },
};
