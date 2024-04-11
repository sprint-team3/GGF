import { z } from 'zod';

const POST_SCHEMA_DEFAULT = z.object({
  price: z.string(),
  title: z.string().min(1),
  description: z.string().min(5),
});

export const PostSchema = [
  POST_SCHEMA_DEFAULT.extend({
    headcount: z.string().min(1),
    address: z.string().min(1),
    discord: z.string().min(1),
    date: z.string().min(1),
    startTime: z.string().min(1),
    endTime: z.string().min(1),
    bannerImageUrl: z.string().optional(),
    subImageUrls: z.string().optional(),
  }),

  POST_SCHEMA_DEFAULT.extend({
    headcount: z.string().min(1),
    discord: z.string().min(1),
    date: z.string().min(1),
    startTime: z.string().min(1),
    endTime: z.string().min(1),
  }),

  POST_SCHEMA_DEFAULT.extend({
    discord: z.string().min(1),
    bannerImageUrl: z.string().optional(),
    subImageUrls: z.string().optional(),
  }),

  POST_SCHEMA_DEFAULT.extend({
    bannerImageUrl: z.string().optional(),
    subImageUrls: z.string().optional(),
  }),
];
