import { MoreButton } from '@/components/commons/buttons';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Buttons/MoreButton',
  component: MoreButton,
} satisfies Meta<typeof MoreButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    isActive: false,
  },
};
