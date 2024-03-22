import { MY_RESERVATIONS_STATUS, POST_TYPES, PRICE_TO_POST_TYPES } from '@/constants';

export const formatStatusToKR = (status: string) => MY_RESERVATIONS_STATUS[status];

export const formatPostTypeToKR = (postType: string) => POST_TYPES[postType];

export const formatPriceToPostType = (price: number) => PRICE_TO_POST_TYPES[price];
