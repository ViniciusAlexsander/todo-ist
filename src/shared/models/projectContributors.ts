import { IRole } from "./role";
import { IUser } from "./user";

export interface IProjectContribution {
  id: string;
  userId: string;
  projectId: string;
  roleId: string;
  role: IRole;
  user: IUser;
}
