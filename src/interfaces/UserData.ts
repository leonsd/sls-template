export interface IUserData {
  id?: number;
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserUpdateData {
  name?: string;
  email?: string;
  confirmationCode?: string;
  isConfirmed?: boolean;
  password?: string;
}
