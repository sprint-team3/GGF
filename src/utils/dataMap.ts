import { PRICE_TO_POST_TYPES } from '@/constants';

import { formatCategoryToGameNameKR } from './gameFormatter';

const DELIMITER = '&iquest';

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
