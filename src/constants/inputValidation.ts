export const ERROR_MESSAGE = {
  email: {
    min: '이메일을 입력해주세요',
    regex: '이메일 형식에 맞게 입력해주세요',
  },
  password: {
    min: '8자 이상 입력해주세요',
    regex: '영문과 숫자를 합해 8자이상 15자 이내로 입력해주세요',
    refine: '비밀번호가 일치하지 않습니다',
  },
  nickname: {
    min: '10자 이내로 입력해주세요',
  },
};

export const REGEX = {
  password: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,15}$/,
};
