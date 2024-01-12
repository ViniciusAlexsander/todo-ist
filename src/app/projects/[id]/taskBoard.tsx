"use client";

import { axiosInstance } from "@/shared/lib/axios";
import { QueryCaches } from "@/shared/lib/reactQuery";
import { Task } from "@/shared/models/project";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

interface ITaskBoardProps {
  tasks: Task[];
  title: string;
  projectId: string;
  statusId: string;
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

  const handleCriarTarefa = async () => {
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
          <p>{task.name}</p>
          <p>{task.description}</p>
        </div>
      ))}
      {adicionando ? (
        <div className="border rounded border-border bg-surfaces p-2 mb-3 shadow ">
          <div className="flex flex-col gap-1">
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
          <button onClick={() => setAdicionando(false)}>X</button>
          <button onClick={handleCriarTarefa}>{"->"}</button>
        </div>
      ) : (
        <div className="p-2">
          <button onClick={() => setAdicionando(true)}>+ Adicionar</button>
        </div>
      )}
    </div>
  );
};
