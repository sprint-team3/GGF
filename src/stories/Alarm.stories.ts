import { Alarm } from '@/components/commons/Alarm';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Alarm',
  component: Alarm,
} satisfies Meta<typeof Alarm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    isExistedAlarm: false,
    isActivated: false,
  },
};
