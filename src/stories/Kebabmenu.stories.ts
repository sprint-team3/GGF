import { Meta, StoryObj } from '@storybook/react';

import Kebabmenu from '@/components/commons/Kebabmenu';

const meta = {
  title: 'Kebabmenu',
  component: Kebabmenu,
} satisfies Meta<typeof Kebabmenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {},
};
