import { ModalButton } from '@/components/commons/modals';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Modals/ModalButton',
  component: ModalButton,
} satisfies Meta<typeof ModalButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    children: '테스트',
  },
};
