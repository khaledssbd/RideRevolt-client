export interface TUser {
  _id: string;
  name: string;
  gender: 'male' | 'female' | 'other';
  image: string;
  email: string;
  role: 'customer' | 'admin';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
}


export type TUsersProps = {
  bikes: TUser[] | undefined;
};

export type TUserProps = {
  bike: TUser;
};