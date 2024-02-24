import { ApiError } from "@/shared/models/ApiError";
import { IProjectContribution } from "@/shared/models/projectContributors";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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

interface IUpdateRoleContribution {
  projectId: string;
}

interface IMutationUpdateRole {
  contributionId: string;
  roleId: string;
}

export const useUpdateRoleContribution = ({
  projectId,
}: IUpdateRoleContribution) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ contributionId, roleId }: IMutationUpdateRole) =>
      axiosInstance.put(`project/contribution/${contributionId}`, {
        roleId,
      }),
    onMutate: async (newRoleContribution: IMutationUpdateRole) => {
      await queryClient.cancelQueries({
        queryKey: [QueryCaches.PROJECTS_CONTRIBUTORS, projectId],
      });

      const previousContributors: IProjectContribution[] | undefined =
        queryClient.getQueryData([
          QueryCaches.PROJECTS_CONTRIBUTORS,
          projectId,
        ]);

      queryClient.setQueryData(
        [QueryCaches.PROJECTS_CONTRIBUTORS, projectId],
        (oldCache: IProjectContribution[]) => {
          const OldContribution = oldCache.find(
            (contribution) =>
              contribution.id === newRoleContribution.contributionId
          );

          return [
            ...oldCache.filter(
              (contribution) => contribution.id !== OldContribution?.id
            ),
            { ...OldContribution, roleId: newRoleContribution.roleId },
          ];
        }
      );

      return { previousContributors, newRoleContribution };
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryCaches.PROJECTS_CONTRIBUTORS, projectId],
      });
    },
    onError: (error: ApiError) => {
      window.alert(error.response.data.message);
    },
  });
};

interface IDeleteContribution {
  projectId: string;
}

interface IMutationDeleteContribution {
  contributionId: string;
}

export const useDeleteContribution = ({ projectId }: IDeleteContribution) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ contributionId }: IMutationDeleteContribution) =>
      axiosInstance.delete(`project/contribution/${contributionId}`),
    onMutate: async (deleteContribution: IMutationDeleteContribution) => {
      await queryClient.cancelQueries({
        queryKey: [QueryCaches.PROJECTS_CONTRIBUTORS, projectId],
      });

      const previousContributors: IProjectContribution[] | undefined =
        queryClient.getQueryData([
          QueryCaches.PROJECTS_CONTRIBUTORS,
          projectId,
        ]);

      queryClient.setQueryData(
        [QueryCaches.PROJECTS_CONTRIBUTORS, projectId],
        (oldCache: IProjectContribution[]) => {
          return [
            ...oldCache.filter(
              (contribution) =>
                contribution.id !== deleteContribution?.contributionId
            ),
          ];
        }
      );

      return { previousContributors, deleteContribution };
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryCaches.PROJECTS_CONTRIBUTORS, projectId],
      });
    },
    onError: (error: ApiError) => {
      window.alert(error.response.data.message);
    },
  });
};
