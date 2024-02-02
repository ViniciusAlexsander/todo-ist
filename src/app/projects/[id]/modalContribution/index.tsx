"use client";

import { useFindProjectContributors } from "@/shared/services/projectContributors";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef, useState } from "react";
import { CardColaborator } from "./cardColaborator";

interface IModalContributionProps {
  modalOpen: boolean;
  handleCloseModal: () => void;
  projectId: string;
}

export const ModalContribution = ({
  modalOpen,
  handleCloseModal,
  projectId,
}: IModalContributionProps) => {
  const [roleId, setRoleId] = useState<string | undefined>(undefined);
  const cancelButtonRef = useRef(null);

  const { data: contributions } = useFindProjectContributors(projectId);

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
                    Opções de compartilhamento
                  </h3>
                </div>
                <div className="p-6">
                  {contributions &&
                    contributions.length > 0 &&
                    contributions.map((contribution) => (
                      <CardColaborator
                        key={contribution.id}
                        contribution={contribution}
                      />
                    ))}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
