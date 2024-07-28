import { Button } from "@/components/Button";
import { TaskStatusEnum, obterStatus } from "@/shared/enum/taskStatusEnum";
import { Task } from "@/shared/models/project";
import { useDeleteTask, useUpdateTask } from "@/shared/services/tasks";
import { useState } from "react";
import { NewTaskCard } from "./newTaskCard";

interface ITaskCardProps {
  task: Task;
  projectId: string;
  statusId: TaskStatusEnum;
}

export const TaskCard = ({ task, projectId, statusId }: ITaskCardProps) => {
  const dadosAtualizacao = obterStatus[statusId];
  const [isEditTask, setIsEditTask] = useState<boolean>(false);

  const { mutate: deleteTask } = useDeleteTask({
    taskId: task.id,
    projectId,
  });

  const { mutate: updateTask } = useUpdateTask({
    taskId: task.id,
    projectId,
    newStatus: dadosAtualizacao?.proxStatus,
  });

  const handleDeleteTask = () => {
    deleteTask();
  };

  const handleUpdateTask = () => {
    updateTask();
  };

  const handleEditTask = () => {
    setIsEditTask(true);
  };

  const onResetEditTask = () => {
    setIsEditTask(false);
  };

  if (isEditTask) {
    return (
      <NewTaskCard
        onResetTask={onResetEditTask}
        projectId={projectId}
        statusId={statusId}
        type="edit"
        task={{ ...task }}
      />
    );
  }

  return (
    <div
      key={task.id}
      className="border rounded border-border bg-surfaces p-2 mb-3 shadow "
    >
      <div className="flex justify-end">
        <button onClick={handleDeleteTask}>x</button>
      </div>
      <div>
        <p>{task.name}</p>
        <p>{task.description}</p>
      </div>
      {statusId !== TaskStatusEnum.DONE && (
        <div className="flex justify-between mt-2 pt-2 border-t border-border">
          <Button size="small" variant="text" onClick={handleEditTask}>
            Editar
          </Button>
          <Button size="small" variant="text" onClick={handleUpdateTask}>
            {dadosAtualizacao.nomeBotao}
          </Button>
        </div>
      )}
    </div>
  );
};
