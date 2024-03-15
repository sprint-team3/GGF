import { ImageField } from '@/components/commons/inputs/ImageField';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'inputs/ImageField',
  component: ImageField,
} satisfies Meta<typeof ImageField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {};
