import { z } from 'zod';

import { ERROR_MESSAGE, INPUT_NAMES, REGEX } from '@/constants';

const { profileImageUrl, nickname, password, passwordConfirm, image } = INPUT_NAMES;

export const ImageSchema = z.object({
  [image]: z.instanceof(File),
});

export const ProfileSchema = z.object({
  email: z.string().optional(),
  [profileImageUrl]: z.string().nullable(),
  [nickname]: z.string().min(1, { message: ERROR_MESSAGE.nickname.min }),
});

export const PasswordSchema = z
  .object({
    [password]: z
      .string()
      .min(8, { message: ERROR_MESSAGE.password.min })
      .regex(REGEX.password, ERROR_MESSAGE.password.regex),
    [passwordConfirm]: z.string(),
  })
  .refine((data) => data[password] === data[passwordConfirm], {
    path: [passwordConfirm],
    message: ERROR_MESSAGE.password.refine,
  });
