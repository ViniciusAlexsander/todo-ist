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
        <div className="flex gap-x-12">
          <a
            href="/"
            className="text-lg font-semibold leading-6 text-primary hover:text-copy-primary"
          >
            Projetos
          </a>
        </div>
        <div className="text-lg flex flex-1 justify-end">
          <div className="hidden sm:flex">
            Signed in as {session?.user?.name}
          </div>
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
