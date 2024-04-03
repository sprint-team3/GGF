import { POST_TYPES_FOR_LISTPAGE } from '@/constants';

import { LinkName } from '@/types';

export const isValidGameName = (game: string): game is LinkName => {
  return ['league-of-legends', 'battlegrounds', 'overwatch-2', 'minecraft'].includes(game);
};

export const isValidPostType = (query: string) => {
  const validPostTypes = String(POST_TYPES_FOR_LISTPAGE.map((item) => item.id));

  if (!validPostTypes.includes(query)) {
    return false;
  }

  return true;
};
