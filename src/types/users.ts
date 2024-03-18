export type ProfileImage = string | null;

export type UserProfile = Pick<Users, 'email' | 'nickname' | 'profileImageUrl'>;

export type Users = {
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
