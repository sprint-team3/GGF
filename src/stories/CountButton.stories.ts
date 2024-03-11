import { CountButton } from '@/components/commons/buttons/CountButton';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Buttons/CountButton',
  component: CountButton,
} satisfies Meta<typeof CountButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    count: 1,
  },
};
