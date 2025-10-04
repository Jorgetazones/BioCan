import jwt from 'jsonwebtoken';

export const generateToken = (user: {
  id: number;
  username: string;
  tipo: string;
}) => {
  return jwt.sign(user, process.env.JWT_SECRET!, {});
};
