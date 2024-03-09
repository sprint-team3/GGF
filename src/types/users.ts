export type SignupParams = {
  email: string;
  nickname: string;
  password: string;
};

export type UsersEditParams = {
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

export type Reviewer = {
  profileImageUrl: string | null;
  nickname: string;
  id: number;
};
