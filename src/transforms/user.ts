import { User } from '../models/UserModel';

export const output = (user: User) => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    isConfirmed: user.isConfirmed,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};
