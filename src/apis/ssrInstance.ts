import axios from 'axios';

import { AXIOS_TIMEOUT } from '@/constants';

const ssrInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: AXIOS_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default ssrInstance;
