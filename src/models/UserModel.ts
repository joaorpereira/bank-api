export enum USER_ROLE {
  ADMIN = "ADMIN",
  NORMAL = "NORMAL",
}

export type User = {
  id: string;
  name: string;
  password: string;
  email: string;
  cpf: string;
  date_of_birth: Date;
  is_admin: USER_ROLE;
};

export type inputUserLogin = {
  email: string;
  password: string;
};

export type inputUserSignUp = {
  name: string;
  password: string;
  email: string;
  cpf: string;
  date_of_birth: Date;
  is_admin: USER_ROLE;
};
