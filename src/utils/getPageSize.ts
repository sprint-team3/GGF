import { PAGE_SIZE, POSTS_PER_PAGE, REVIEWS_PER_PAGE } from '@/constants';

import { DeviceType } from '@/types';

export const getPostPageSize = (deviceType: DeviceType) => (deviceType === 'Mobile' ? PAGE_SIZE : POSTS_PER_PAGE);

export const getReviewPageSize = (deviceType: DeviceType) => (deviceType === 'Mobile' ? PAGE_SIZE : REVIEWS_PER_PAGE);
