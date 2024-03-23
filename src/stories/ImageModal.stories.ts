import ImageModal from '@/components/postDetail/ImageModal';
import { IMAGE_LIST } from '@/constants/mockData/imageList';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'PostDetail/ImageModal',
  component: ImageModal,
} satisfies Meta<typeof ImageModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    isOpen: true,
    imageSrc: IMAGE_LIST[0],
  },
};
