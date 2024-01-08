import { Task } from "@/shared/models/project";

interface ITaskBoardProps {
  tasks: Task[];
  title: string;
}

export const TaskBoard = ({ tasks, title }: ITaskBoardProps) => {
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
      <div className="p-2">+ Adicionar</div>
    </div>
  );
};
