import { GameNameEN, GameNameKR } from '@/types';

export const GAME_NAME_EN = {
  0: 'LEAGUE OF LEGENDS',
  1: 'BATTLEGROUNDS',
  2: 'OVERWATCH 2',
  3: 'MINECRAFT',
} as const;

export const GAME_NAME_KR = {
  0: '리그오브레전드',
  1: '배틀그라운드',
  2: '오버워치 2',
  3: '마인크래프트',
} as const;

export const GAME_NAME_LIST_EN: GameNameEN[] = Object.values(GAME_NAME_EN);
export const GAME_NAME_LIST_KR: GameNameKR[] = Object.values(GAME_NAME_KR);
