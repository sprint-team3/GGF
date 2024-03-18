import { GameKey, GameName } from '@/types';

export const GAME_KEY = {
  0: 'LEAGUE OF LEGENDS',
  1: 'BATTLEGROUNDS',
  2: 'OVERWATCH 2',
  3: 'MINECRAFT',
} as const;

export const GAME_NAME = {
  0: '리그오브레전드',
  1: '배틀그라운드',
  2: '오버워치 2',
  3: '마인크래프트',
} as const;

export const GAME_KEY_LIST: GameKey[] = Object.values(GAME_KEY);
export const GAME_NAME_LIST: GameName[] = Object.values(GAME_NAME);
