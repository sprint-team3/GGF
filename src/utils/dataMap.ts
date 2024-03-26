import { PRICE_TO_POST_TYPES } from '@/constants';

import { formatCategoryToGameNameKR } from './gameFormatter';

const DELIMITER = '&iquest';

export const joinTitleByDelimiter = (array: string[]) => array.join(DELIMITER);

export const splitTitleByDelimiter = (inputString: string) => {
  const [category, title, postType, address, MaxCount] = inputString.split(DELIMITER);

  return {
    category: formatCategoryToGameNameKR(category),
    title,
    postType: PRICE_TO_POST_TYPES[+postType],
    address,
    MaxCount,
  };
};

export const splitDescByDelimiter = (inputString: string) => {
  const [description, discordLink] = inputString.split(DELIMITER);

  return {
    description,
    discordLink,
  };
};
