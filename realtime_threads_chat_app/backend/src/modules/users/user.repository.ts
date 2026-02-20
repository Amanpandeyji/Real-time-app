import { query } from "../../db/db.js";
import { User, UserRow } from "./user.types.js";

function hydrateUser(row: UserRow): User {
  return {
    id: row.id,
    email: row.email,
    displayName: row.display_name,
    handle: row.handle,
    bio: row.bio,
    avatarUrl: row.avatar_url,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function repoGetUserById(userId: number): Promise<User> {
  const result = await query<UserRow>(
    `SELECT id, email, display_name, handle, avatar_url, bio, created_at, updated_at 
     FROM users WHERE id = ?`,
    [userId]
  );

  if (result.rows.length === 0) {
    throw new Error(`No user found for id = ${userId}`);
  }

  return hydrateUser(result.rows[0]);
}

export async function repoUpdateUserProfile(params: {
  userId: number;
  displayName?: string;
  handle?: string;
  bio?: string;
  avatarUrl?: string;
}): Promise<User> {
  const { userId, displayName, handle, bio, avatarUrl } = params;

  const setClauses: string[] = [];
  const values: unknown[] = [];

  if (displayName !== undefined) {
    setClauses.push(`display_name = ?`);
    values.push(displayName);
  }

  if (handle !== undefined) {
    setClauses.push(`handle = ?`);
    values.push(handle);
  }

  if (bio !== undefined) {
    setClauses.push(`bio = ?`);
    values.push(bio);
  }

  if (avatarUrl !== undefined) {
    setClauses.push(`avatar_url = ?`);
    values.push(avatarUrl);
  }

  setClauses.push(`updated_at = NOW()`);
  values.push(userId);

  await query(
    `UPDATE users SET ${setClauses.join(", ")} WHERE id = ?`,
    values
  );

  return repoGetUserById(userId);
}
