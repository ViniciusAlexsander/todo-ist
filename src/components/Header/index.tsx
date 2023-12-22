"use client";

import { signOut, useSession } from "next-auth/react";
import { NewProjectModal } from "../NewProjectModal";
import { useState } from "react";

export const Header = () => {
  const { data: session } = useSession();
  const [openNewProjectModal, setOpenNewProjectModal] = useState(false);
  return (
    <header>
      <NewProjectModal
        modalOpen={openNewProjectModal}
        handleCloseModal={() => setOpenNewProjectModal(false)}
      />
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="hidden lg:flex lg:gap-x-12">
          <a href="/" className="text-sm font-semibold leading-6 text-gray-900">
            Projetos
          </a>
          <button
            className="text-sm font-semibold leading-6 text-gray-900"
            onClick={() => setOpenNewProjectModal(true)}
          >
            Criar projeto
          </button>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          Signed in as {session?.user?.name}
          <button
            onClick={() => signOut()}
            className="text-sm font-semibold leading-6 text-gray-900 ml-3"
          >
            Sign out <span aria-hidden="true">&rarr;</span>
          </button>
        </div>
      </nav>
    </header>
  );
};
