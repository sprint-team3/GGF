import { z } from 'zod';

import { ERROR_MESSAGE } from '@/constants';

const { minPlayMember, availableSchedule } = ERROR_MESSAGE;

export const ReservationSchema = z.object({
  headCount: z.number().min(1, { message: minPlayMember.min }),
  scheduleId: z.number().refine((id) => id !== 0, { message: availableSchedule.min }),
});
