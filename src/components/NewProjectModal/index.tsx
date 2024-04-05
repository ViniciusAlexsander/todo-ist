import { axiosInstance } from "@/shared/lib/axios";
import { QueryCaches } from "@/shared/lib/reactQuery";
import { Dialog, Transition } from "@headlessui/react";
import { useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, Fragment, useReducer, useRef } from "react";
import { toast } from "react-toastify";
import { ZodError, z } from "zod";
import { Button } from "../Button";
import { initialState, reducerNewProjectComImmer } from "./newProjectService";

interface INewProjectModalProps {
  modalOpen: boolean;
  handleCloseModal: () => void;
}

const newProjectSchema = z.object({
  name: z
    .string()
    .min(1, { message: "name is required" })
    .max(20, { message: "name is to long" }),
  description: z.string().min(1, { message: "description is required" }),
});

export const NewProjectModal = ({
  modalOpen,
  handleCloseModal,
}: INewProjectModalProps) => {
  const cancelButtonRef = useRef(null);
  const [newProject, dispatch] = useReducer(
    reducerNewProjectComImmer,
    initialState
  );

  const queryClient = useQueryClient();

  const handleCriarTarefa = async () => {
    try {
      dispatch({
        type: "LOADING",
        state: true,
      });
      const zodProject = newProjectSchema.parse(newProject);

      await axiosInstance.post("project", {
        description: zodProject.description,
        name: zodProject.name,
      });

      dispatch({
        type: "LOADING",
        state: false,
      });
      queryClient.invalidateQueries({ queryKey: [QueryCaches.PROJECTS] });
      dispatch({
        type: "RESET_VALUE",
      });
      handleCloseModal();
    } catch (error: ZodError | any) {
      toast.error("Erro ao criar projeto, " + error.issues[0].message);
    } finally {
      dispatch({
        type: "LOADING",
        state: false,
      });
    }
  };

  const handleName = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "CHANGE_NAME",
      state: e.target.value,
    });
  };

  const handleDescription = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "CHANGE_DESCRIPTION",
      state: e.target.value,
    });
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
                        value={newProject.name}
                        onChange={handleName}
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
                        value={newProject.description}
                        onChange={handleDescription}
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
                      size="medium"
                      onClick={handleCriarTarefa}
                      fullWidth
                      loading={newProject.loading}
                      disabled={!newProject.name || !newProject.description}
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
