import Footer from '@/components/layout/Footer';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Layout/Footer',
  component: Footer,
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {};
