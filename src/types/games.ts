import { GAME_KEY, GAME_NAME } from '@/constants';

export type GameKey = (typeof GAME_KEY)[keyof typeof GAME_KEY];
export type GameName = (typeof GAME_NAME)[keyof typeof GAME_NAME];
