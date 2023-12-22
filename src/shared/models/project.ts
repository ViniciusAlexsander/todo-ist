import { User } from "./user";

export interface IProject {
  id: string;
  userId: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  projectContribution: ProjectContribution[];
}

export interface ProjectContribution {
  id: string;
  userId: string;
  projectId: string;
  user: User;
}
