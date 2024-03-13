import { MY_RESERVATIONS_STATUS, POST_TYPES } from '@/constants';

import { MyReservationsStatus, PostTypes } from '@/types';

export const formatStatusToKR = (status: MyReservationsStatus) => MY_RESERVATIONS_STATUS[status];

export const formatPostTypeToKR = (postType: PostTypes) => POST_TYPES[postType];
