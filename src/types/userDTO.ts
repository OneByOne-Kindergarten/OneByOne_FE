export interface UserResponse {
  user: User;
}

export interface User {
  userId: number;
  nickname: string;
  profileImageUrl: string | null;
  role: string;
}
