"use client";

import { Loading } from "@/components/Loading";
import { useProjects } from "@/shared/services/projects";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Page() {
  const { data, isLoading } = useProjects();
  const { data: session } = useSession();

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
    return <div>sem projetos, crie um novo</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-10">
      {data &&
        data.length > 0 &&
        data?.map((project) => (
          <div
            key={project.id}
            className="border-solid border border-primary rounded-lg p-4"
          >
            <div className="w-full flex justify-end">
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
  );
}
