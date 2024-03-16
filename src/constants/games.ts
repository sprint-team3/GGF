import { GameKey, GameName } from '@/types/games';

export const GAMES = {
  'LEAGUE OF LEGENDS': '리그오브레전드',
  BATTLEGROUNDS: '배틀그라운드',
  'OVERWATCH 2': '오버워치 2',
  MINECRAFT: '마인크래프트',
} as const;

export const GAME_KEY_LIST: GameKey[] = ['LEAGUE OF LEGENDS', 'BATTLEGROUNDS', 'OVERWATCH 2', 'MINECRAFT'];

export const GAME_NAME_LIST: GameName[] = ['리그오브레전드', '배틀그라운드', '오버워치 2', '마인크래프트'];
