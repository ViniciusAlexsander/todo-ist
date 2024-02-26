import { Button } from "@/components/Button";
import { NewProjectModal } from "@/components/NewProjectModal";
import NoProjectsImg from "@/shared/assets/imgs/no-projects.svg";
import Image from "next/image";
import { useState } from "react";

export const NoProjectAdvice = () => {
  const [openNewProjectModal, setOpenNewProjectModal] = useState(false);
  const handleCloseModalNewProject = () => {
    setOpenNewProjectModal(false);
  };

  const handleOpenModalNewProject = () => {
    setOpenNewProjectModal(true);
  };

  return (
    <div className="flex items-center justify-center">
      <NewProjectModal
        modalOpen={openNewProjectModal}
        handleCloseModal={handleCloseModalNewProject}
      />
      <div className="max-w-screen-sm flex flex-col items-center justify-between gap-10 p-10 sm:py-36">
        <div className="max-w-40 sm:max-w-80">
          <Image src={NoProjectsImg} alt="Login image" />
        </div>

        <div>
          <p className="text-2xl text-copy-primary font-normal mb-6">
            Você ainda não tem nenhuma projeto criado. Crie um projeto agora
            mesmo!
          </p>
          <Button onClick={handleOpenModalNewProject} fullWidth size="large">
            Criar novo projeto
          </Button>
        </div>
      </div>
    </div>
  );
};
