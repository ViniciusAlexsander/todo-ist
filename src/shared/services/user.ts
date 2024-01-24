import { IFindUserResponse } from "@/shared/models/user";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import { QueryCaches } from "../lib/reactQuery";

export const useFindUser = (email: string) => {
  return useQuery({
    queryKey: [QueryCaches.USER, email],
    queryFn: async () => {
      const { data } = await axiosInstance.get<IFindUserResponse[]>(`user/`, {
        params: {
          email,
        },
      });

      return data;
    },
    staleTime: 60 * 60 * 1000,
    enabled: email.length > 3,
  });
};
