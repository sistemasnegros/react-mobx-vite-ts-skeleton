export enum UsersRolesDomain {
  STANDARD = "standard",
  ADMIN = "admin",
}

export interface UsersDomain {
  id: string;
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  role: UsersRolesDomain;
  fullName?: string;
}
