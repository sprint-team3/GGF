import { CATEGORY_TO_GAME } from '@/constants';

import { GAME_NAME_EN_TO_KR } from './../constants/games';

export const formatGameToLink = (game: string) => game.toLowerCase().replace(/\s+/g, '-');

export const formatCategoryToGameNameEN = (category: string) => CATEGORY_TO_GAME[category];

export const formatCategoryToGameNameKR = (category: string) => GAME_NAME_EN_TO_KR[CATEGORY_TO_GAME[category]];
