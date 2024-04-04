export const ERROR_MESSAGE = {
  email: {
    min: '이메일을 입력해주세요',
    regex: '이메일 형식에 맞게 입력해주세요',
  },
  password: {
    min: '8자 이상 입력해주세요',
    regex: '영문과 숫자를 합해 8자이상 15자 이내로 입력해주세요',
    refine: '비밀번호가 일치하지 않습니다',
    placeholder: '새 비밀번호를 입력해주세요',
  },
  nickname: {
    min: '10자 이내로 입력해주세요',
    palceholder: '닉네임을 입력해주세요',
  },
  review: {
    min: '최소 5자 이상 입력해 주세요',
    placeholder: '리뷰를 입력해 주세요',
  },
  rating: {
    min: '별점 1점 이상 등록해 주세요',
  },
  minPlayMember: {
    min: '참여 인원을 1명 이상 선택해 주세요',
  },
  availableSchedule: {
    min: '예약 가능한 날이 없습니다',
  },
};

export const REGEX = {
  password: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,15}$/,
  textarea: /\n/g,
};

export const API_ERROR_MESSAGE = {
  signin: {
    404: '회원가입을 해주세요',
    400: '이메일과 비밀번호를 확인해주세요',
  },
  signup: {
    400: '입력 값을 다시 확인해주세요',
    409: '이미 존재하는 이메일입니다',
  },
  reservation: {
    400: '이미 지난 일정은 예약할 수 없습니다',
    409: '더 이상 예약할 수 없는 일정입니다',
  },
  notification: {
    404: '존재하지 않는 알림입니다',
  },
  create: {
    401: '다시 로그인해 주세요',
    500: '서버가 불안정합니다',
    fail: '다시 한 번 확인해 주세요',
  },
  edit: {
    400: '예약이 있는 예약 시간대는 수정할 수 없습니다',
    401: '다시 로그인해 주세요',
    403: '본인의 체험만 수정할 수 있습니다',
    404: '존재하지 않는 게시글입니다',
    500: '서버가 불안정합니다',
    fail: '다시 한 번 확인해 주세요',
  },
};
