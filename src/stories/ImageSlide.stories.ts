import ImageSlide from '@/components/postDetail/ImageSlide';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'PostDetail/ImageSlide',
  component: ImageSlide,
} satisfies Meta<typeof ImageSlide>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {},
};
