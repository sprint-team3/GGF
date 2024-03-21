import { PostTypes } from '@/types';

export const POST_TYPES = {
  offline: '오프라인',
  online: '온라인',
  'clan-recruitment': '클랜 모집',
  'game-strategy': '게임 공략',
};

export const PRICE_TO_POST_TYPES: Record<number, PostTypes> = {
  0: 'offline',
  1: 'online',
  2: 'clan-recruitment',
  3: 'game-strategy',
};
