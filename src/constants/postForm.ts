import { z } from 'zod';

import { POST_TYPES } from './postTypes';

export const PRICE_RADIO_LIST = [
  { id: POST_TYPES.offline, label: POST_TYPES.offline, value: 0 },
  { id: POST_TYPES.online, label: POST_TYPES.online, value: 1 },
  { id: POST_TYPES['clan-recruitment'], label: POST_TYPES['clan-recruitment'], value: 2 },
  { id: POST_TYPES['game-strategy'], label: POST_TYPES['game-strategy'], value: 3 },
];

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

export const SCRIPT_URL = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';

export const ADDRESS_POPUP_SIZE = {
  width: 500,
  height: 600,
};

export const ADDRESS_CUSTOM_THEME = {
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

export const VALID_IMAGE_URL = {
  usual: 'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/',
  unusual: 'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image',
};

export const DEFAULT_API_DATA_ADDRESS = '온라인';

export const recruitmentTypes = {
  isOfflineOrOnline: (price: number) => price < 2,
  isOffline: (price: number) => price === 0,
  isNotGameStrategy: (price: number) => price !== 3,
  isNotOnline: (price: number) => price !== 1,
};

export const DEFAULT_API_DATA_BANNER_IMAGE = {
  스포츠:
    'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/2-3_116_1711946737274.png',
  투어: 'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/2-3_116_1711946754858.png',
  관광: 'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/2-3_116_1711946774216.png',
  웰빙: 'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/2-3_116_1711946790176.png',
};
