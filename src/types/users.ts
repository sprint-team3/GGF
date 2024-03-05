export type SignupParams = {
  email: string;
  nickname: string;
  password: string;
};

export type EditParams = {
  nickname?: string;
  profileImageUrl?: string;
  newPassword?: string;
};

export type Users = {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
};
