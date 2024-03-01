export type NewProject = {
  name: string;
  description: string;
};

export type NewProjectAction =
  | { type: "CHANGE_DESCRIPTION"; state: string }
  | { type: "CHANGE_NAME"; state: string }
  | { type: "RESET_VALUE" };

export const initialState: NewProject = {
  description: "",
  name: "",
};

export function reducerNewProject(state: NewProject, action: NewProjectAction) {
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
