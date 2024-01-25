import { IRole } from "@/shared/models/role";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import { QueryCaches } from "../lib/reactQuery";

export const useRoles = () => {
  return useQuery({
    queryKey: [QueryCaches.ROLES],
    queryFn: async () => {
      const { data } = await axiosInstance.get<IRole[]>(`roles`);

      return data;
    },
    staleTime: 60 * 60 * 1000,
  });
};
