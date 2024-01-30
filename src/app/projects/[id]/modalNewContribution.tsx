"use client";

import { Button } from "@/components/Button";
import { axiosInstance } from "@/shared/lib/axios";
import { QueryCaches } from "@/shared/lib/reactQuery";
import { useRoles } from "@/shared/services/roles";
import { useFindUser } from "@/shared/services/user";
import { Dialog, Transition } from "@headlessui/react";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Image from "next/image";
import { Fragment, useRef, useState } from "react";

interface INewProjectModalProps {
  modalOpen: boolean;
  handleCloseModal: () => void;
  projectId: string;
}

export const ModalNewContribution = ({
  modalOpen,
  handleCloseModal,
  projectId,
}: INewProjectModalProps) => {
  const cancelButtonRef = useRef(null);
  const [emailSearch, setEmailSearch] = useState("");
  const [userIdSelected, setUserIdSelect] = useState<string | null>(null);
  const [roleId, setRoleId] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();

  const { data: roles } = useRoles();
  const { data: collaborators } = useFindUser(emailSearch);

  const handleSelectContributionChange = (e) => {
    setUserIdSelect(e.target.value);
  };

  const handleSearchContribution = async () => {
    try {
      setLoading(true);
      await axiosInstance.post("project/contribution", {
        projectId,
        roleId,
        userId: userIdSelected,
      });
      queryClient.invalidateQueries({ queryKey: [QueryCaches.PROJECTS] });
      handleCloseModal();
    } catch (error: AxiosError) {
      window.alert(error.response.data.error);
    } finally {
      setLoading(false);
      setUserIdSelect(null);
      setEmailSearch("");
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
                    Convidar novo colaborador
                  </h3>
                </div>
                <div className="p-6">
                  <form>
                    <label className="block mt-9">
                      <span className="block text-sm font-semibold text-copy-primary">
                        Email
                      </span>
                      <input
                        value={emailSearch}
                        onChange={(e) => setEmailSearch(e.target.value)}
                        placeholder="Email do colaborador"
                        className="border-border border-2 rounded-md p-2 w-full"
                        type="text"
                      />
                    </label>
                    <label className="block mt-9">
                      <span className="block text-sm font-semibold text-copy-primary">
                        Selecione o papel do colaborador
                      </span>

                      <select
                        className="w-full"
                        value={roleId}
                        onChange={(e) => setRoleId(e.target.value)}
                      >
                        <option value="">Selecione o papel</option>

                        {roles &&
                          roles.map((role) => (
                            <option key={role.id} value={role.id}>
                              {role.description}
                            </option>
                          ))}
                      </select>
                    </label>
                  </form>
                  {collaborators && collaborators.length > 0 && (
                    <div className="mt-6">
                      <p className="font-bold text-copy-primary text-sm">
                        Selecione o novo colaborador
                      </p>

                      <div>
                        {collaborators.map((collaborator) => (
                          <div key={collaborator.id} className="flex gap-x-3">
                            <input
                              type="radio"
                              id={collaborator.id}
                              value={collaborator.id}
                              name="Contribution"
                              checked={userIdSelected === collaborator.id}
                              onChange={handleSelectContributionChange}
                            />
                            <Image
                              src={collaborator.image}
                              alt={`Avatar de ${collaborator.name}`}
                              width="30"
                              height="30"
                              className="rounded-3xl"
                            />
                            <p>
                              <strong>Email: </strong>
                              {collaborator.email}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

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
                      size="medium"
                      onClick={handleSearchContribution}
                      fullWidth
                      loading={loading}
                      disabled={!userIdSelected || !roleId}
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
