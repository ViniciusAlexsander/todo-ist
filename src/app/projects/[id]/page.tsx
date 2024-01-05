"use client";

import { Button } from "@/components/Button";
import { useFindProject } from "@/shared/services/projects";
import { Task } from "@/shared/models/project";
import Image from "next/image";
import Link from "next/link";

export default function Page({ params }: { params: { id: string } }) {
  const { data, isLoading } = useFindProject(params.id);

  if (isLoading) return <div>isLoading</div>;

  let tasksGroupedByStatus: {
    "In Progress": Task[];
    Todo: Task[];
    Done: Task[];
  } = {
    "In Progress": [],
    Done: [],
    Todo: [],
  };

  // Iterate through the tasks array and group tasks by status name
  data?.tasks.forEach((task) => {
    const statusName = task.status.name;

    if (!tasksGroupedByStatus[statusName]) {
      tasksGroupedByStatus[statusName] = [];
    }

    tasksGroupedByStatus[statusName].push(task);
  });

  return (
    <div className="p-10">
      <div className="flex w-full justify-end">
        <Link href="/">
          Voltar <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>

      <div className="w-full flex justify-between mt-4">
        <div>
          <h1 className="text-xl font-bold">{data?.name}</h1>
          <p className="text-base">{data?.description}</p>
        </div>
        <div className="mt-2">
          {data && data.projectContribution.length > 0 && (
            <div className="flex gap-2 justify-between">
              <div className="flex gap-2">
                {data.projectContribution.map((contribution) => (
                  <Image
                    key={contribution.id}
                    src={contribution.user.image}
                    alt={`Avatar de ${contribution.user.name}`}
                    width="30"
                    height="30"
                    className="rounded-3xl"
                  />
                ))}
              </div>
              <Button
                onClick={() => window.alert("precisa ser feito")}
                size="small"
              >
                +
              </Button>
            </div>
          )}
          {data && data.projectContribution.length === 0 && (
            <Button
              onClick={() => window.alert("precisa ser feito")}
              size="small"
              fullWidth
            >
              Convide pessoas para contribuir
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-7">
        <div>
          <h2 className="text-xl font-bold">Todo</h2>
          {tasksGroupedByStatus &&
            tasksGroupedByStatus.Todo.map((task) => (
              <div key={task.id}>
                <p>{task.name}</p>
                <p>{task.description}</p>
              </div>
            ))}
        </div>
        <div>
          <h2 className="text-xl font-bold">In Progress</h2>
          {tasksGroupedByStatus &&
            tasksGroupedByStatus["In Progress"].map((task) => (
              <div key={task.id}>
                <p>{task.name}</p>
                <p>{task.description}</p>
              </div>
            ))}
        </div>
        <div>
          <h2 className="text-xl font-bold">DONE</h2>
          {tasksGroupedByStatus &&
            tasksGroupedByStatus.Done.map((task) => (
              <div key={task.id}>
                <p>{task.name}</p>
                <p>{task.description}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
