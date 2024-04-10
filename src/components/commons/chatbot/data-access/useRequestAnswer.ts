import { Dispatch, SetStateAction } from 'react';

import { useMutation } from '@tanstack/react-query';

import { getChatbotAnswer } from '@/apis/chatbot';
import { getCurrentTime } from '@/utils';

import { Chat } from '@/types';

export type useRequestAnswerProps = {
  setChatStore: Dispatch<SetStateAction<Chat[]>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setQuestion: Dispatch<SetStateAction<string>>;
  question: string;
};

export const useRequestAnswer = ({ setChatStore, setLoading, setQuestion, question }: useRequestAnswerProps) => {
  const { mutate: chatbotAnswerMutation } = useMutation({
    mutationFn: getChatbotAnswer,
    onSuccess(res) {
      const { answer } = res.data;
      setChatStore((prev: Chat[]) => {
        const updatedChatStore = [...prev];
        const index = updatedChatStore.findIndex((chat) => chat.question === question);
        if (index >= 0) {
          updatedChatStore[index].answer = answer;
          updatedChatStore[index].answerDate = getCurrentTime();
        }
        return updatedChatStore;
      });
      setLoading(false);
      setQuestion('');
    },
    onError(error) {
      console.error('Error submitting user input:', error);
    },
  });

  return { chatbotAnswerMutation };
};
