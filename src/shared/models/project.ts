import { User } from "./user";

export interface IProject {
  id: string;
  userId: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  projectContribution: ProjectContribution[];
  tasks: Task[];
  role: Role;
}

export interface ProjectContribution {
  id: string;
  userId: string;
  projectId: string;
  user: User;
}

export interface Task {
  id: string;
  projectId: string;
  name: string;
  description: string;
  statusId: string;
  createdAt: Date;
  updatedAt: Date;
  status: Status;
}
export interface Status {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Role {
  id: string;
  description: string;
  rolePermission: RolePermission[];
}

export interface RolePermission {
  permission: Permission;
}

interface Permission {
  id: string;
  description: string;
}
