"use client";

import { Button } from "@/components/Button";
import { TaskStatusEnum } from "@/shared/enum/taskStatusEnum";
import { Task } from "@/shared/models/project";
import { useFindProject } from "@/shared/services/projects";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ModalNewContribution } from "./modalNewContribution";
import { TaskBoard } from "./taskBoard";

export default function Page({ params }: { params: { id: string } }) {
  const { id: projectId } = params;
  const [openModalNewContribution, setOpenModalNewContribution] =
    useState(false);

  const { data, isLoading } = useFindProject(projectId);

  if (isLoading) return <div>isLoading</div>;

  let tasksGroupedByStatus: { [status: string]: Task[] } = {
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

  const handleOpenModalNewContribution = () => {
    setOpenModalNewContribution(true);
  };

  return (
    <div className="pt-0 p-10">
      <ModalNewContribution
        modalOpen={openModalNewContribution}
        handleCloseModal={() => setOpenModalNewContribution(false)}
        projectId={projectId}
      />
      <div className="w-full flex justify-between mt-5">
        <div>
          <h1 className="text-xl font-bold text-primary">{data?.name}</h1>
          <p className="text-base text-copy-primary">{data?.description}</p>
        </div>
        <div className="flex">
          <div className="mr-8">
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
                <Button onClick={handleOpenModalNewContribution} size="small">
                  +
                </Button>
              </div>
            )}
            {data && data.projectContribution.length === 0 && (
              <Button
                onClick={handleOpenModalNewContribution}
                size="small"
                fullWidth
              >
                Convide pessoas para contribuir
              </Button>
            )}
          </div>

          <Link href="/">
            Voltar <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>

      <div className="w-3/4 grid grid-cols-3 gap-4 mt-10">
        <TaskBoard
          tasks={tasksGroupedByStatus.Todo}
          title="Todo"
          projectId={projectId}
          statusId={TaskStatusEnum.TODO}
        />
        <TaskBoard
          tasks={tasksGroupedByStatus["In Progress"]}
          title="In Progress"
          projectId={projectId}
          statusId={TaskStatusEnum.IN_PROGRESS}
        />
        <TaskBoard
          tasks={tasksGroupedByStatus.Done}
          title="Done"
          projectId={projectId}
          statusId={TaskStatusEnum.DONE}
        />
      </div>
    </div>
  );
}
