"use client";

import { TaskStatusEnum } from "@/shared/enum/taskStatusEnum";
import { Task } from "@/shared/models/project";
import { useState } from "react";
import { NewTaskCard } from "./newTaskCard";
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

  const onResetAddNewTask = () => {
    setIsAddNewTask(false);
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
        <NewTaskCard
          onResetTask={onResetAddNewTask}
          projectId={projectId}
          statusId={statusId}
          type="create"
        />
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
