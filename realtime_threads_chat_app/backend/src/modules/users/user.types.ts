// schema DB vs that we r going to expose to api

export type UserRow = {
  id: number;
  email: string;
  display_name: string | null;
  handle: string | null;
  avatar_url: string | null;
  bio: string | null;
  created_at: Date;
  updated_at: Date;
};

export type User = {
  id: number;
  email: string;
  displayName: string | null;
  handle: string | null;
  avatarUrl: string | null;
  bio: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type UserProfile = {
  user: User;
};

export type UserProfileResponse = {
  id: number;
  email: string;
  displayName: string | null;
  handle: string | null;
  avatarUrl: string | null;
  bio: string | null;
};

export function toUserProfileResponse(
  profile: UserProfile
): UserProfileResponse {
  const { user } = profile;

  return {
    id: user.id,
    email: user.email,
    displayName: user.displayName,
    handle: user.handle ?? null,
    avatarUrl: user.avatarUrl ?? null,
    bio: user.bio ?? null,
  };
}
