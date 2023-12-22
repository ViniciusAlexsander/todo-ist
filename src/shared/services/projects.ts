import { useQuery } from "react-query";
import { QueryCaches } from "../lib/reactQuery";
import { axiosInstance } from "../lib/axios";

export interface IProject {
  id: string;
  userId: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export const useProjects = () => {
  return useQuery(
    QueryCaches.PROJECTS,
    async () => {
      const { data } = await axiosInstance.get<IProject[]>("project");

      return data;
    },
    {
      staleTime: 60 * 60 * 1000,
    }
  );
};

export const useFindProject = (projectId: string) => {
  return useQuery(
    [QueryCaches.PROJECTS, projectId],
    async () => {
      const { data } = await axiosInstance.get<IProject>(
        `project/${projectId}`
      );

      return data;
    },
    {
      staleTime: 60 * 60 * 1000,
    }
  );
};
