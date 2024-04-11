import { z } from 'zod';

const { minPlayMember, availableSchedule } = ERROR_MESSAGE;
import { ERROR_MESSAGE } from '@/constants';

export const ReservationSchema = z.object({
  headCount: z.number().min(1, { message: minPlayMember.min }),
  scheduleId: z.number().refine((id) => id !== 0, { message: availableSchedule.min }),
});
