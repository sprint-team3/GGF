import { BaseButton } from '@/components/commons/buttons';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Buttons/BaseButton',
  component: BaseButton,
} satisfies Meta<typeof BaseButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    theme: 'outline',
    size: 'small',
    children: '테스트',
  },
};
