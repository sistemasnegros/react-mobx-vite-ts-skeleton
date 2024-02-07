// export enum EUsersRolesDomain {
//   STANDARD = "standard",
//   ADMIN = "admin",
// }

export interface IUsersDomain {
  _id: string;
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  role: string;
  fullName?: string;
}
