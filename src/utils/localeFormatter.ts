import { MY_RESERVATIONS_STATUS } from '@/constants';

import { RECRUIT_TYPES } from '@/constants/recruitType';

import { MyReservationsStatus, RecruitTypes } from '@/types';

export const formatStatusToKR = (status: MyReservationsStatus) => MY_RESERVATIONS_STATUS[status];

export const formatRecruitTypeToKR = (recruitType: RecruitTypes) => RECRUIT_TYPES[recruitType];
