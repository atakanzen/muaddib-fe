type UserAuthDTO = {
  username: string;
  password: string;
};

type AuthResponse = {
  bearer: string;
};

export type { AuthResponse, UserAuthDTO };
