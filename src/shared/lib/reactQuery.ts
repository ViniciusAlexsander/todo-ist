import { QueryClient } from "react-query";

export const queryClient = new QueryClient();

export enum QueryCaches {
  PROJECTS = "PROJECTS",
}
