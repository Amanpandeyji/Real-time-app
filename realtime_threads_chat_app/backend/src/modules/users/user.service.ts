import { UserProfile } from "./user.types.js";
import { repoGetUserById, repoUpdateUserProfile } from "./user.repository.js";

export async function getUserById(userId: number): Promise<UserProfile> {
  const user = await repoGetUserById(userId);
  
  return {
    user,
  };
}

export async function updateUserProfile(params: {
  userId: number;
  displayName?: string;
  handle?: string;
  bio?: string;
  avatarUrl?: string;
}): Promise<UserProfile> {
  const { userId, displayName, handle, bio, avatarUrl } = params;

  const updatedUser = await repoUpdateUserProfile({
    userId,
    displayName,
    bio,
    handle,
    avatarUrl,
  });

  return {
    user: updatedUser,
  };
}

