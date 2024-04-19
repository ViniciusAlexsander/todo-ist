import { useQuery } from "@tanstack/react-query";
import { QueryCaches } from "../lib/reactQuery";
import { axiosInstance } from "../lib/axios";
import { IProject } from "../models/project";

export const useProjects = () => {
  return useQuery({
    queryKey: [QueryCaches.PROJECTS],
    queryFn: async () => {
      const { data } = await axiosInstance.get<IProject[]>("projectaaaaaa");

      return data;
    },
    staleTime: 60 * 60 * 1000,
  });
};

export const useFindProject = (projectId: string) => {
  return useQuery({
    queryKey: [QueryCaches.PROJECTS, projectId],
    queryFn: async () => {
      const { data } = await axiosInstance.get<IProject>(
        `project/${projectId}`
      );

      return data;
    },
    staleTime: 60 * 60 * 1000,
  });
};
