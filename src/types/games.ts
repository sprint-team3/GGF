import { GAME_NAME_EN, GAME_NAME_KR } from '@/constants';

export type GameNameEN = (typeof GAME_NAME_EN)[keyof typeof GAME_NAME_EN];
export type GameNameKR = (typeof GAME_NAME_KR)[keyof typeof GAME_NAME_KR];
