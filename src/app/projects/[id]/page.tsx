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
import { verifyPermission } from "@/shared/utils/permissions";
import { PermissionsEnum } from "@/shared/enum/permissionsEnum";

export default function Page({ params }: { params: { id: string } }) {
  const { id: projectId } = params;
  const [openModalNewContribution, setOpenModalNewContribution] =
    useState(false);

  const { data, isLoading, isError, error } = useFindProject(projectId);

  if (isLoading || !data) return <div>isLoading</div>;

  if (isError) return <div>Você não tem acesso a esse projeto</div>;

  const hadPermissionInviteProject = verifyPermission(
    data.role.rolePermission,
    PermissionsEnum.INVITE_PROJECT
  );

  let tasksGroupedByStatus: { [status: string]: Task[] } = {
    IN_PROGRESS: [],
    DONE: [],
    TODO: [],
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
                {hadPermissionInviteProject && (
                  <Button onClick={handleOpenModalNewContribution} size="small">
                    +
                  </Button>
                )}
              </div>
            )}
            {hadPermissionInviteProject &&
              data &&
              data.projectContribution.length === 0 && (
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
          tasks={tasksGroupedByStatus.TODO}
          title="Todo"
          projectId={projectId}
          statusId={TaskStatusEnum.TODO}
        />
        <TaskBoard
          tasks={tasksGroupedByStatus.IN_PROGRESS}
          title="In Progress"
          projectId={projectId}
          statusId={TaskStatusEnum.IN_PROGRESS}
        />
        <TaskBoard
          tasks={tasksGroupedByStatus.DONE}
          title="Done"
          projectId={projectId}
          statusId={TaskStatusEnum.DONE}
        />
      </div>
    </div>
  );
}
