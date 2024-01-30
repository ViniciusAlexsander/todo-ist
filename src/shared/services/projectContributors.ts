import { IProjectContribution } from "@/shared/models/projectContributors";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import { QueryCaches } from "../lib/reactQuery";

export const useFindProjectContributors = (projectId: string) => {
  return useQuery({
    queryKey: [QueryCaches.PROJECTS_CONTRIBUTORS, projectId],
    queryFn: async () => {
      const { data } = await axiosInstance.get<IProjectContribution[]>(
        `project/${projectId}/contribution`
      );

      return data;
    },
    staleTime: 60 * 60 * 1000,
  });
};
