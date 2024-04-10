import axios from 'axios';

export const getChatbotAnswer = async (question: string) => {
  return await axios.post('/api/generate', { question });
};
