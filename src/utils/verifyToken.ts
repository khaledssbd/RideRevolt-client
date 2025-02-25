import { jwtDecode } from 'jwt-decode';

export const verifyToken = (token: string) => {
  return jwtDecode(token);
};



// import { jwtDecode } from 'jwt-decode';
// import jwt from 'jsonwebtoken';

// interface CustomJwtPayload extends jwt.JwtPayload {
//   role?: string;
// }

// export const verifyToken = (token: string): CustomJwtPayload | null => {
//   return jwtDecode(token) as CustomJwtPayload | null;
// };
