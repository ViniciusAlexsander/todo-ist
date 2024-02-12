"use client";

import { signOut, useSession } from "next-auth/react";
import { NewProjectModal } from "../NewProjectModal";
import { useState } from "react";

export const Header = () => {
  const { data: session } = useSession();
  const [openNewProjectModal, setOpenNewProjectModal] = useState(false);

  const handleCloseModalNewProject = () => {
    setOpenNewProjectModal(false);
  };

  const handleOpenModalNewProject = () => {
    setOpenNewProjectModal(true);
  };

  const handleSingOut = () => {
    signOut();
  };

  return (
    <header>
      <NewProjectModal
        modalOpen={openNewProjectModal}
        handleCloseModal={handleCloseModalNewProject}
      />
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="hidden lg:flex lg:gap-x-12">
          <a
            href="/"
            className="text-lg font-semibold leading-6 text-primary hover:text-copy-primary"
          >
            Projetos
          </a>
          <button
            className="text-lg font-semibold leading-6 text-primary hover:text-copy-primary"
            onClick={handleOpenModalNewProject}
          >
            Criar projeto
          </button>
        </div>
        <div className="text-lg hidden lg:flex lg:flex-1 lg:justify-end">
          Signed in as {session?.user?.name}
          <button
            onClick={handleSingOut}
            className="font-semibold leading-6 text-secondary hover:text-copy-secondary ml-3 "
          >
            Sign out <span aria-hidden="true">&rarr;</span>
          </button>
        </div>
      </nav>
    </header>
  );
};
