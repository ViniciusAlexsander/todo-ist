import { produce } from "immer";

export type CreateNewProject = {
  name: string;
  description: string;
  loading: boolean;
};

export type NewProjectAction =
  | { type: "CHANGE_DESCRIPTION"; state: string }
  | { type: "CHANGE_NAME"; state: string }
  | { type: "RESET_VALUE" }
  | { type: "LOADING"; state: boolean };

export const initialState: CreateNewProject = {
  description: "",
  name: "",
  loading: false,
};

export const reducerNewProjectComImmer = produce(
  (draft, action: NewProjectAction) => {
    switch (action.type) {
      case "CHANGE_DESCRIPTION":
        return { ...draft, description: action.state };
      case "CHANGE_NAME":
        return { ...draft, name: action.state };
      case "RESET_VALUE":
        return { ...initialState };
      case "LOADING":
        return { ...draft, loading: action.state };
      default:
        throw Error("Unknown action: ");
    }
  }
);

export function reducerNewProject(
  state: CreateNewProject,
  action: NewProjectAction
) {
  switch (action.type) {
    case "CHANGE_DESCRIPTION":
      return { ...state, description: action.state };
    case "CHANGE_NAME":
      return { ...state, name: action.state };
    case "RESET_VALUE":
      return { ...initialState };
    default:
      throw Error("Unknown action: ");
  }
}
