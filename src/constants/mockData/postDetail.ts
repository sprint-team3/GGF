import { IMAGE_LIST } from './imageList';

export const POST_DETAIL_DATA = {
  id: 7,
  userId: 21,
  title: '투어&iquest[성인만 가능]카배 CK 클랜원 모집합니다.&iquest0&iquest강남 SBXG 포탈 PC방&iquest3',
  description:
    '둠칫 둠칫 두둠칫 우리 클랜에 들어오세요\n둠칫 둠칫 두둠칫 우리 클랜에 들어오세요\n둠칫 둠칫 두둠칫 우리 클랜에 들어오세요&iquesthttps://github.com/sprint-team3/GGF',
  category: '투어',
  price: 1,
  address: '서울특별시 강남구 테헤란로 427',
  bannerImageUrl: IMAGE_LIST[0],
  subImages: [
    {
      id: 1,
      imageUrl: IMAGE_LIST[1],
    },
    {
      id: 2,
      imageUrl: IMAGE_LIST[2],
    },
    {
      id: 3,
      imageUrl: IMAGE_LIST[3],
    },
  ],
  schedules: [
    {
      id: 1,
      date: '2023-12-01',
      startTime: '12:00',
      endTime: '13:00',
    },
    {
      id: 2,
      date: '2023-12-05',
      startTime: '12:00',
      endTime: '13:00',
    },
  ],
  reviewCount: 5,
  rating: 4,
  createdAt: '2023-12-31T21:28:50.589Z',
  updatedAt: '2023-12-31T21:28:50.589Z',
};
