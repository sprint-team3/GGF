import ArrowButton from '@/components/calendar/ArrowButton';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Buttons/ArrowButton',
  component: ArrowButton,
} satisfies Meta<typeof ArrowButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {},
};
