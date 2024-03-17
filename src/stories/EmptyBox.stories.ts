import EmptyBox from '@/components/EmptyBox';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'EmptyBox',
  component: EmptyBox,
} satisfies Meta<typeof EmptyBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    text: 'No Reservation',
  },
};
