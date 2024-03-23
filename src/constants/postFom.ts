import { z } from 'zod';

import { POST_TYPES } from './postTypes';

export const priceRadioList = [
  { id: POST_TYPES.offline, label: POST_TYPES.offline, value: 0 },
  { id: POST_TYPES.online, label: POST_TYPES.online, value: 1 },
  { id: POST_TYPES['clan-recruitment'], label: POST_TYPES['clan-recruitment'], value: 2 },
  { id: POST_TYPES['game-strategy'], label: POST_TYPES['game-strategy'], value: 3 },
];

export const PostSchema = [
  z.object({
    price: z.string(),
    title: z.string().min(1),
    headcount: z.string().min(1),
    address: z.string().min(1),
    discord: z.string().min(1),
    description: z.string().min(5),
    date: z.string().min(1),
    startTime: z.string().min(1),
    endTime: z.string().min(1),
    bannerImageUrl: z.string().optional(),
    subImageUrls: z.string().optional(),
  }),

  z.object({
    price: z.string(),
    title: z.string().min(1),
    headcount: z.string().min(1),
    discord: z.string().min(1),
    description: z.string().min(5),
    date: z.string().min(1),
    startTime: z.string().min(1),
    endTime: z.string().min(1),
  }),

  z.object({
    price: z.string(),
    title: z.string().min(1),
    discord: z.string().min(1),
    description: z.string().min(5),
    bannerImageUrl: z.string().optional(),
    subImageUrls: z.string().optional(),
  }),

  z.object({
    price: z.string(),
    title: z.string().min(1),
    description: z.string().min(5),
    bannerImageUrl: z.string().optional(),
    subImageUrls: z.string().optional(),
  }),
];

export const headcountOptions = {
  ['스포츠']: [
    { title: '1', value: '1' },
    { title: '2', value: '2' },
    { title: '3', value: '3' },
    { title: '4', value: '4' },
  ],
  ['투어']: [
    { title: '1', value: '1' },
    { title: '2', value: '2' },
    { title: '3', value: '3' },
  ],
  ['관광']: [
    { title: '1', value: '1' },
    { title: '2', value: '2' },
    { title: '3', value: '3' },
    { title: '4', value: '4' },
    { title: '5', value: '5' },
    { title: '6', value: '6' },
    { title: '7', value: '7' },
    { title: '8', value: '8' },
    { title: '9', value: '9' },
  ],
  ['웰빙']: [
    { title: '1', value: '1' },
    { title: '2', value: '2' },
    { title: '3', value: '3' },
    { title: '4', value: '4' },
    { title: '5', value: '5' },
    { title: '6', value: '6' },
    { title: '7', value: '7' },
    { title: '8', value: '8' },
    { title: '9', value: '9' },
    { title: '10', value: '10' },
  ],
};

export const SCRIPT_URL = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';

export const addressCustomTheme = {
  bgColor: '#0D0D0D',
  searchBgColor: '#0D0D0D',
  contentBgColor: '#141414',
  pageBgColor: '#141414',
  textColor: '#ACACAC',
  queryTextColor: '#ACACAC',
  postcodeTextColor: '#852DFF',
  emphTextColor: '#852DFF',
  outlineColor: '#ACACAC',
};

export const schedulesTime = {
  start: [
    { title: '00:00', value: '00:00' },
    { title: '01:00', value: '01:00' },
    { title: '02:00', value: '02:00' },
    { title: '03:00', value: '03:00' },
    { title: '04:00', value: '04:00' },
    { title: '05:00', value: '05:00' },
    { title: '06:00', value: '06:00' },
    { title: '07:00', value: '07:00' },
    { title: '08:00', value: '08:00' },
    { title: '09:00', value: '09:00' },
    { title: '10:00', value: '10:00' },
    { title: '11:00', value: '11:00' },
    { title: '12:00', value: '12:00' },
    { title: '13:00', value: '13:00' },
    { title: '14:00', value: '14:00' },
    { title: '15:00', value: '15:00' },
    { title: '16:00', value: '16:00' },
    { title: '17:00', value: '17:00' },
    { title: '18:00', value: '18:00' },
    { title: '19:00', value: '19:00' },
    { title: '20:00', value: '20:00' },
    { title: '21:00', value: '21:00' },
    { title: '22:00', value: '22:00' },
    { title: '23:00', value: '23:00' },
  ],

  end: [
    { title: '01:00', value: '01:00' },
    { title: '02:00', value: '02:00' },
    { title: '03:00', value: '03:00' },
    { title: '04:00', value: '04:00' },
    { title: '05:00', value: '05:00' },
    { title: '06:00', value: '06:00' },
    { title: '07:00', value: '07:00' },
    { title: '08:00', value: '08:00' },
    { title: '09:00', value: '09:00' },
    { title: '10:00', value: '10:00' },
    { title: '11:00', value: '11:00' },
    { title: '12:00', value: '12:00' },
    { title: '13:00', value: '13:00' },
    { title: '14:00', value: '14:00' },
    { title: '15:00', value: '15:00' },
    { title: '16:00', value: '16:00' },
    { title: '17:00', value: '17:00' },
    { title: '18:00', value: '18:00' },
    { title: '19:00', value: '19:00' },
    { title: '20:00', value: '20:00' },
    { title: '21:00', value: '21:00' },
    { title: '22:00', value: '22:00' },
    { title: '23:00', value: '23:00' },
    { title: '24:00', value: '24:00' },
  ],
};
