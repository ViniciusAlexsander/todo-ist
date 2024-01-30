"use client";

import { useFindProjectContributors } from "@/shared/services/projectContributors";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { Fragment, useRef } from "react";

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
  const cancelButtonRef = useRef(null);

  const { data: contributions } = useFindProjectContributors(projectId);

  console.log({ contributions });

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
                      <div
                        key={contribution.id}
                        className="flex gap-x-3 items-center p-2 mb-2"
                      >
                        <div>
                          <Image
                            src={contribution.user.image}
                            alt={`Avatar de ${contribution.user.name}`}
                            width="30"
                            height="30"
                            className="rounded-3xl"
                          />
                        </div>
                        <div>
                          <p>{contribution.user.name}</p>
                          <p>{contribution.user.email}</p>
                        </div>
                        <div></div>
                      </div>
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
