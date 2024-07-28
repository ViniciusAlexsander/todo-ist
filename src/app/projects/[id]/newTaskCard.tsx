import { TaskStatusEnum } from "@/shared/enum/taskStatusEnum";
import { useCreateTask, useUpdateTask } from "@/shared/services/tasks";
import { ChangeEvent, useState } from "react";

interface INewTaskCardProps {
  projectId: string;
  onResetTask: () => void;
  statusId: TaskStatusEnum;
  type: "create" | "edit";
  task?: {
    id: string;
    description: string;
    name: string;
  };
}

export const NewTaskCard = ({
  projectId,
  statusId,
  onResetTask,
  task,
  type,
}: INewTaskCardProps) => {
  const [name, setName] = useState(task?.name || "");
  const [description, setDescription] = useState(task?.description || "");

  const resetState = () => {
    setName("");
    setDescription("");
    onResetTask();
  };

  const { mutate: createTask, isPending: isCreateTaskPending } = useCreateTask({
    projectId,
    resetState,
  });

  const { mutate: updateTask } = useUpdateTask({
    taskId: task?.id!,
    projectId,
    description,
    name,
    resetState,
  });

  const handleCreateTask = () => {
    createTask({ description, name, projectId, statusId });
  };

  const handleEditTask = () => {
    updateTask();
  };

  const handleTaskNameInput = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleTaskDescriptionInput = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  return (
    <div className="border rounded border-border bg-surfaces  mb-3 shadow ">
      <div className="flex flex-col gap-1 p-2">
        <input
          type="text"
          placeholder="Nome da tarefa"
          onChange={handleTaskNameInput}
          value={name}
        />
        <input
          type="text"
          placeholder="Descrição"
          onChange={handleTaskDescriptionInput}
          value={description}
        />
      </div>
      <div className="flex justify-between border-t border-border p-2">
        <button
          className="text-primary hover:text-copy-secondary"
          onClick={onResetTask}
        >
          Cancelar
        </button>
        {type === "create" && (
          <button
            className="text-primary hover:text-copy-secondary"
            onClick={handleCreateTask}
          >
            {isCreateTaskPending && (
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-4 h-4 me-3 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
            )}
            Adicionar
          </button>
        )}
        {type === "edit" && (
          <button
            className="text-primary hover:text-copy-secondary"
            onClick={handleEditTask}
          >
            {isCreateTaskPending && (
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-4 h-4 me-3 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
            )}
            Editar
          </button>
        )}
      </div>
    </div>
  );
};
