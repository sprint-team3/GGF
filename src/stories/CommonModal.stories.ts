import { CommonModal } from '@/components/commons/modals';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Modals/CommonModal',
  component: CommonModal,
} satisfies Meta<typeof CommonModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    openModal: true,
    title: '모달 테스트',
    renderContent: '내부 컨텐츠',
  },
};
