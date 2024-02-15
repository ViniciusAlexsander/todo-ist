"use client";

import { TaskStatusEnum } from "@/shared/enum/taskStatusEnum";
import { Task } from "@/shared/models/project";
import { useCreateTask } from "@/shared/services/tasks";
import { ChangeEvent, useState } from "react";
import { TaskCard } from "./taskCard";

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
  const [isAddNewTask, setIsAddNewTask] = useState<boolean>(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const resetState = () => {
    setName("");
    setDescription("");
    setIsAddNewTask(false);
  };

  const { mutate: createTask } = useCreateTask({
    description,
    statusId,
    name,
    projectId,
    resetState,
  });

  const handleCreateTask = () => {
    createTask();
  };

  const handleCancel = () => {
    setIsAddNewTask(false);
  };

  const handleTaskNameInput = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleTaskDescriptionInput = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleAddNewTask = () => {
    setIsAddNewTask(true);
  };

  return (
    <div>
      <div className="flex items-baseline mb-4 text-primary">
        <h2 className="text-xl font-bold  text-primary">{title}</h2>
        <p className="ml-3 text-sm">{tasks.length}</p>
      </div>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          projectId={projectId}
          statusId={statusId}
        />
      ))}
      {isAddNewTask ? (
        <div className="border rounded border-border bg-surfaces  mb-3 shadow ">
          <div className="flex flex-col gap-1 p-2">
            <input
              type="text"
              placeholder="Nome da tarefa"
              onChange={handleTaskNameInput}
            />
            <input
              type="text"
              placeholder="Descrição"
              onChange={handleTaskDescriptionInput}
            />
          </div>
          <div className="flex justify-between border-t border-border p-2">
            <button
              className="text-primary hover:text-copy-secondary"
              onClick={handleCancel}
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
            onClick={handleAddNewTask}
          >
            + Adicionar tarefa
          </button>
        </div>
      )}
    </div>
  );
};
