import { OperationButton } from '@/components/commons/buttons/OperationButton';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Buttons/OperationButton',
  component: OperationButton,
} satisfies Meta<typeof OperationButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    type: 'add',
  },
};
