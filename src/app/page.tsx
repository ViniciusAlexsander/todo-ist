"use client";

import { Button } from "@/components/Button";
import { UserGroupIcon } from "@/components/Icons";
import { Loading } from "@/components/Loading";
import { NewProjectModal } from "@/components/NewProjectModal";
import { NoProjectAdvice } from "@/components/NoProjectsAdvice";
import { useProjects } from "@/shared/services/projects";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const { data, isLoading } = useProjects();
  const { data: session } = useSession();
  const [openNewProjectModal, setOpenNewProjectModal] = useState(false);

  if (!session) {
    redirect("/auth/login");
  }

  if (isLoading)
    return (
      <div>
        <Loading />
      </div>
    );

  if (data && data.length === 0) {
    return <NoProjectAdvice />;
  }

  const handleCloseModalNewProject = () => {
    setOpenNewProjectModal(false);
  };

  const handleOpenModalNewProject = () => {
    setOpenNewProjectModal(true);
  };

  return (
    <div className="p-6">
      <NewProjectModal
        modalOpen={openNewProjectModal}
        handleCloseModal={handleCloseModalNewProject}
      />
      <div className="flex items-center justify-center sm:justify-end mb-4">
        <Button
          size="medium"
          className="w-full sm:w-auto"
          onClick={handleOpenModalNewProject}
        >
          Criar projeto
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
        {data &&
          data.length > 0 &&
          data?.map((project) => (
            <div
              key={project.id}
              className="border-solid border border-primary rounded-lg p-4"
            >
              <div
                className={`w-full flex ${
                  session.user.id !== project.createdBy
                    ? "justify-between"
                    : "justify-end"
                }`}
              >
                {session.user.id !== project.createdBy && (
                  <div className="flex items-center text-copy-secondary ">
                    <UserGroupIcon  />
                    <p className="text-base font-semibold leading-6 ml-2">
                      Colaborador
                    </p>
                  </div>
                )}
                <a
                  href={`/projects/${project.id}`}
                  className="text-base font-semibold leading-6 text-secondary hover:text-copy-secondary ml-3"
                >
                  Ver detalhes <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
              <div>
                <p>
                  <b>Nome do projeto: </b>
                  {project.name}
                </p>
                <p>
                  <b>Descrição: </b>
                  {project.description}
                </p>
                {/* <div>
                <b>Contribuidores: </b>
                <div className="mt-2">
                  {project.projectContribution.length > 0 && (
                    <div className="flex gap-2 justify-between">
                      <div className="flex gap-2">
                        {project.projectContribution.map((contribution) => (
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
                  {project.projectContribution.length === 0 && (
                    <Button
                      onClick={() => window.alert("precisa ser feito")}
                      size="small"
                      fullWidth
                    >
                      Convide pessoas para contribuir
                    </Button>
                  )}
                </div>
              </div> */}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
