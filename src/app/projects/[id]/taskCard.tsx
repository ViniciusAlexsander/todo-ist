import { TaskStatusEnum, obterStatus } from "@/shared/enum/taskStatusEnum";
import { Task } from "@/shared/models/project";
import { useDeleteTask, useUpdateTask } from "@/shared/services/tasks";

interface ITaskCardProps {
  task: Task;
  projectId: string;
  statusId: TaskStatusEnum;
}

export const TaskCard = ({ task, projectId, statusId }: ITaskCardProps) => {
  const dadosAtualizacao = obterStatus[statusId];

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
        <div>
          <button onClick={handleUpdateTask}>
            {dadosAtualizacao.nomeBotao}
          </button>
        </div>
      )}
    </div>
  );
};
