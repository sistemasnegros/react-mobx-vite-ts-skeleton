export enum EUsersRolesDomain {
  STANDARD = "standard",
  ADMIN = "admin",
}

export interface IUsersDomain {
  id: string;
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  role: EUsersRolesDomain;
  fullName?: string;
}