export type ProfileImage = string | null;

export type UserProfile = Pick<UsersResponse, 'email' | 'nickname' | 'profileImageUrl'>;

export type UsersResponse = {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: ProfileImage;
  createdAt: string;
  updatedAt: string;
};

export type SignupParams = {
  email: string;
  nickname: string;
  password: string;
};

export type UsersEditParams = {
  nickname?: string;
  profileImageUrl?: ProfileImage;
  newPassword?: string;
};

export type Reviewer = {
  profileImageUrl: ProfileImage;
  nickname: string;
  id: number;
};
