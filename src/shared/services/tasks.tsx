import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TaskStatusEnum } from "../enum/taskStatusEnum";
import { axiosInstance } from "../lib/axios";
import { QueryCaches } from "../lib/reactQuery";

interface ICreateTask {
  name: string;
  description: string;
  statusId: TaskStatusEnum;
  projectId: string;
  resetState: () => void;
}

export const useCreateTask = ({
  description,
  name,
  projectId,
  statusId,
  resetState,
}: ICreateTask) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () =>
      axiosInstance.post(`project/${projectId}/task`, {
        name,
        description,
        statusId,
      }),
    onSettled: async () => {
      return await queryClient.invalidateQueries({
        queryKey: [QueryCaches.PROJECTS, projectId],
      });
    },
    onSuccess: (data) => {
      resetState();
    },
    onError: (error: Error) => {
      window.alert("Erro ao criar tarefa, tente novamente mais tarde" + error);
    },
  });
};

interface IDeleteTask {
  taskId: string;
  projectId: string;
}

export const useDeleteTask = ({ projectId, taskId }: IDeleteTask) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () =>
      axiosInstance.delete(`project/${projectId}/task/${taskId}`),
    onSettled: async () => {
      return await queryClient.invalidateQueries({
        queryKey: [QueryCaches.PROJECTS],
      });
    },
    onSuccess: (data) => {},
    onError: (error: Error) => {
      window.alert(
        "Erro ao excluir tarefa, tente novamente mais tarde" + error
      );
    },
  });
};

interface IUpdateTask {
  taskId: string;
  newStatus: TaskStatusEnum;
  projectId: string;
}

export const useUpdateTask = ({
  taskId,
  newStatus,
  projectId,
}: IUpdateTask) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () =>
      axiosInstance.put(`project/${projectId}/task/${taskId}`, {
        statusId: newStatus,
      }),
    onSettled: async () => {
      return await queryClient.invalidateQueries({
        queryKey: [QueryCaches.PROJECTS],
      });
    },
    onSuccess: (data) => {},
    onError: (error: Error) => {
      window.alert("Erro ao atualizar tarefa, tente novamente mais tarde");
    },
  });
};
