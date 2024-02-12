"use client";

import { TaskStatusEnum, obterStatus } from "@/shared/enum/taskStatusEnum";
import { axiosInstance } from "@/shared/lib/axios";
import { QueryCaches } from "@/shared/lib/reactQuery";
import { Task } from "@/shared/models/project";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

interface ITaskBoardProps {
  tasks: Task[];
  title: string;
  projectId: string;
  statusId: TaskStatusEnum;
}

export const TaskBoard = ({
  tasks,
  title,
  projectId,
  statusId,
}: ITaskBoardProps) => {
  const [adicionando, setAdicionando] = useState<boolean>(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();

  const handleCreateTask = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.post(`project/${projectId}/task`, {
        name,
        description,
        statusId,
      });

      setLoading(false);
      queryClient.invalidateQueries({ queryKey: [QueryCaches.PROJECTS] });
      setName("");
      setDescription("");
      setAdicionando(false);
    } catch (error) {
      window.alert("Erro ao criar tarefa, tente novamente mais tarde");
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      setLoading(true);
      const response = await axiosInstance.delete(
        `project/${projectId}/task/${taskId}`
      );

      setLoading(false);
      queryClient.invalidateQueries({ queryKey: [QueryCaches.PROJECTS] });
      setName("");
      setDescription("");
    } catch (error) {
      window.alert("Erro ao excluir tarefa, tente novamente mais tarde");
    }
  };

  const handleUpdateTask = async ({
    taskId,
    newStatus,
  }: {
    taskId: string;
    newStatus: string;
  }) => {
    try {
      setLoading(true);
      const response = await axiosInstance.put(
        `project/${projectId}/task/${taskId}`,
        {
          statusId: newStatus,
        }
      );

      setLoading(false);
      queryClient.invalidateQueries({ queryKey: [QueryCaches.PROJECTS] });
      setName("");
      setDescription("");
    } catch (error) {
      window.alert("Erro ao excluir tarefa, tente novamente mais tarde");
    }
  };

  const dadosAtualizacao = obterStatus[statusId];

  return (
    <div>
      <div className="flex items-baseline mb-4 text-primary">
        <h2 className="text-xl font-bold  text-primary">{title}</h2>
        <p className="ml-3 text-sm">{tasks.length}</p>
      </div>
      {tasks.map((task) => (
        <div
          key={task.id}
          className="border rounded border-border bg-surfaces p-2 mb-3 shadow "
        >
          <div className="flex justify-end">
            <button onClick={() => handleDeleteTask(task.id)}>x</button>
          </div>
          <div>
            <p>{task.name}</p>
            <p>{task.description}</p>
          </div>
          {statusId !== TaskStatusEnum.DONE && (
            <div>
              <button
                onClick={() => {
                  handleUpdateTask({
                    newStatus: dadosAtualizacao.proxStatus,
                    taskId: task.id,
                  });
                }}
              >
                {dadosAtualizacao.nomeBotao}
              </button>
            </div>
          )}
        </div>
      ))}
      {adicionando ? (
        <div className="border rounded border-border bg-surfaces  mb-3 shadow ">
          <div className="flex flex-col gap-1 p-2">
            <input
              type="text"
              placeholder="Nome da tarefa"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Descrição"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex justify-between border-t border-border p-2">
            <button
              className="text-primary hover:text-copy-secondary"
              onClick={() => setAdicionando(false)}
            >
              Cancelar
            </button>
            <button
              className="text-primary hover:text-copy-secondary"
              onClick={handleCreateTask}
            >
              Adicionar
            </button>
          </div>
        </div>
      ) : (
        <div className="p-2">
          <button
            className="text-primary hover:text-copy-secondary"
            onClick={() => setAdicionando(true)}
          >
            + Adicionar tarefa
          </button>
        </div>
      )}
    </div>
  );
};
