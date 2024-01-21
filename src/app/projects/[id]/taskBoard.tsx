"use client";

import { axiosInstance } from "@/shared/lib/axios";
import { QueryCaches } from "@/shared/lib/reactQuery";
import { Task } from "@/shared/models/project";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { DragEvent } from "react";

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

  const handleDragStart = (event: DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData("text", event.target.id);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    console.log("handleDrop", event.target.id);
    if (event.target.id) {
      console.log("entrou no if");
      event.preventDefault();
      return;
    }

    var data = event.dataTransfer.getData("text");
    event.target.appendChild(document.getElementById(data));
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div>
      <div className="flex items-baseline mb-4 text-primary">
        <h2 className="text-xl font-bold  text-primary">{title}</h2>
        <p className="ml-3 text-sm">{tasks.length}</p>
      </div>
      <div
        key={statusId}
        onDrop={(event) => handleDrop(event)}
        onDragOver={(event) => handleDragOver(event)}
      >
        {tasks.map((task) => (
          <div
            id={`task-${task.id}`}
            key={task.id}
            className="border rounded border-border bg-surfaces p-2 mb-3 shadow"
            draggable="true"
            onDragStart={(event) => handleDragStart(event)}
          >
            <div className="flex justify-end">
              <button onClick={() => handleDeleteTask(task.id)}>x</button>
            </div>
            <div>
              <p>{task.name}</p>
              <p>{task.description}</p>
            </div>
          </div>
        ))}
      </div>
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
            <button onClick={() => setAdicionando(false)}>Cancelar</button>
            <button onClick={handleCreateTask}>Adicionar</button>
          </div>
        </div>
      ) : (
        <div className="p-2">
          <button onClick={() => setAdicionando(true)}>+ Adicionar</button>
        </div>
      )}
    </div>
  );
};
