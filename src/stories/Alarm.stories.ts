import { Alarm } from '@/components/layout/header/Alarm';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Profile/Alarm',
  component: Alarm,
} satisfies Meta<typeof Alarm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    isAlarmExisted: false,
    isActivated: false,
    alarmRef: { current: null },
  },
};
