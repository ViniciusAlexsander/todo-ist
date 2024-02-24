export interface IProjectContributionOutput {
  id: string;
  userId: string;
  projectId: string;
  roleId: string;
  project: IProjectOutput;
}

export interface IProjectOutput {
  id: string;
  createdBy: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  user: IUserOutput;
}

export interface IUserOutput {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
}
