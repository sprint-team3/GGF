import EmptyCard from '@/components/commons/cards/EmptyCard';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Cards/EmptyCard',
  component: EmptyCard,
} satisfies Meta<typeof EmptyCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    text: 'No Reservation',
  },
};
