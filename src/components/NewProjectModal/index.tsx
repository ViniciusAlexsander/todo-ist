"use client";

import { axiosInstance } from "@/shared/lib/axios";
import { QueryCaches, queryClient } from "@/shared/lib/reactQuery";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef, useState } from "react";
import { Button } from "../Button";

interface INewProjectModalProps {
  modalOpen: boolean;
  handleCloseModal: () => void;
}

export const NewProjectModal = ({
  modalOpen,
  handleCloseModal,
}: INewProjectModalProps) => {
  const cancelButtonRef = useRef(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCriarTarefa = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.post("project", {
        description,
        name,
      });
      setLoading(false);
      queryClient.invalidateQueries(QueryCaches.PROJECTS);
      setName("");
      setDescription("");
      handleCloseModal();
    } catch (error) {
      window.alert("Erro ao criar projeto, tente novamente mais tarde");
    }
  };

  return (
    <Transition.Root show={modalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={handleCloseModal}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-surfaces text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="border-border border-b-2 p-6">
                  <h3 className="font-bold text-copy-primary text-xl">
                    Criar novo projeto
                  </h3>
                </div>
                <div className="p-6">
                  <form>
                    <label className="block mt-9">
                      <span className="block text-sm font-semibold text-copy-primary">
                        Nome
                      </span>
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Descreva o que deve ser feito"
                        className="border-border border-2 rounded-md p-2 w-full"
                        type="text"
                      />
                    </label>
                    <label className="block mt-9">
                      <span className="block text-sm font-semibold text-copy-primary">
                        Descrição
                      </span>
                      <input
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Descreva o que deve ser feito"
                        className="border-border border-2 rounded-md p-2 w-full"
                        type="text"
                      />
                    </label>
                  </form>
                  <div className="w-full flex justify-between gap-x-3 mt-6">
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0"
                      onClick={handleCloseModal}
                      ref={cancelButtonRef}
                    >
                      Cancelar
                    </button>
                    <Button
                      onClick={handleCriarTarefa}
                      fullWidth
                      loading={loading}
                      disabled={!name || !description}
                    >
                      Criar projeto
                    </Button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
