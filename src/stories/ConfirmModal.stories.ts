import { ConfirmModal, ModalButton } from '@/components/commons/modal';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Modals/ConfirmModal',
  component: ConfirmModal,
} satisfies Meta<typeof ConfirmModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Stop_Example: Story = {
  args: {
    openModal: true,
    warning: true,
    state: 'STOP',
    title: '모달 테스트',
    desc: '모달 테스트입니당',
    children: (() => {
      const cancelBtn = ModalButton({ variant: 'warning', children: '예약 취소', onClick: () => {} });
      const closeBtn = ModalButton({ children: '닫기', onClick: () => {} });
      return [cancelBtn, closeBtn];
    })(),
  },
};

export const Success_Example: Story = {
  args: {
    openModal: true,
    state: 'SUCCESS',
    title: '모달 테스트',
    desc: '모달 테스트입니당',
    children: ModalButton({ variant: 'success', children: '완료', onClick: () => {} }),
  },
};
