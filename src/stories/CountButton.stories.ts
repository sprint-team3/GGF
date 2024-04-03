import { CountButton } from '@/components/commons/buttons';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Buttons/CountButton',
  component: CountButton,
} satisfies Meta<typeof CountButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    label: '참여 인원',
    count: 1,
    maxPlayMember: 3,
    isDisabled: false,
  },
};
