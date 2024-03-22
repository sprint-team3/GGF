export type PostTypesEN = 'offline' | 'online' | 'clan-recruitment' | 'game-strategy';

export type PostTypesKR = '오프라인' | '온라인' | '클랜 모집' | '게임 공략';

export type ReservedPostTypesEN = Extract<PostTypesEN, 'offline' | 'online'>;
