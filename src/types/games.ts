import { GAMES } from '@/constants';

export type GameKey = keyof typeof GAMES;
export type GameName = (typeof GAMES)[GameKey];
