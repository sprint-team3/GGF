import { CATEGORY_TO_GAME, GAME_NAME_EN_TO_KR, WEBPS } from '@/constants';

import { GameNameEN, LinkName } from '@/types';

export const formatGameToLink = (game: GameNameEN) => game.toLowerCase().replace(/\s+/g, '-');

export const formatLinkToGame = (link: LinkName) => link.toUpperCase().replace(/-/g, ' ');

export const formatCategoryToGameNameEN = (category: string) => CATEGORY_TO_GAME[category];

export const formatCategoryToGameNameKR = (category: string) => GAME_NAME_EN_TO_KR[CATEGORY_TO_GAME[category]];

export const formatCategoryToBannerImageURL = (category: string) =>
  WEBPS.banner[formatCategoryToGameNameEN(category)].url;
