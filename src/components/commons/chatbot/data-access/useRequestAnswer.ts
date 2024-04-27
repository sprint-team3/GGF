import { Dispatch, SetStateAction } from 'react';

import { useMutation } from '@tanstack/react-query';

import { getChatbotAnswer } from '@/apis/chatbot';
import { getCurrentTime } from '@/utils';

import { Chat } from '@/types';

export type useRequestAnswerProps = {
  setChatStore: Dispatch<SetStateAction<Chat[]>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

export const useRequestAnswer = ({ setChatStore, setLoading }: useRequestAnswerProps) => {
  const { mutate: chatbotAnswerMutation } = useMutation({
    mutationFn: getChatbotAnswer,
    onSuccess(res) {
      const { answer } = res.data;

      setChatStore((prev: Chat[]) => {
        const updatedChatStore = [...prev];
        const currentChatIndex = updatedChatStore.length - 1;

        if (currentChatIndex >= 0) {
          updatedChatStore[currentChatIndex] = {
            ...updatedChatStore[currentChatIndex],
            answer,
            answerDate: getCurrentTime(),
          };
        }

        return updatedChatStore;
      });

      setLoading(false);
    },
    onError(error) {
      console.error('Error submitting user input:', error);
    },
  });

  return { chatbotAnswerMutation };
};
