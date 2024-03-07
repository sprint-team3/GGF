import { MY_RESERVATIONS_STATUS } from '@/constants';

import { MyReservationsStatus } from '@/types';

export const formatStatusToKorea = (status: MyReservationsStatus) => MY_RESERVATIONS_STATUS[status];
