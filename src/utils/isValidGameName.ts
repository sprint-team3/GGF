import { LinkName } from '@/types';

export const isValidGameName = (game: string): game is LinkName => {
  return ['league-of-legends', 'battlegrounds', 'overwatch-2', 'minecraft'].includes(game);
};
