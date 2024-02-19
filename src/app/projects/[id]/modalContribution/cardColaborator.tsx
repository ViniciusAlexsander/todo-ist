import { Button } from "@/components/Button";
import { axiosInstance } from "@/shared/lib/axios";
import { QueryCaches } from "@/shared/lib/reactQuery";
import { ApiError } from "@/shared/models/ApiError";
import { IProjectContribution } from "@/shared/models/projectContributors";
import { useRoles } from "@/shared/services/roles";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Image from "next/image";
import { useState } from "react";

interface ICardColaboratorProps {
  contribution: IProjectContribution;
}

export const CardColaborator = ({ contribution }: ICardColaboratorProps) => {
  const [roleId, setRoleId] = useState<string>(contribution.role.id);
  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();
  const { data: roles } = useRoles();

  const handleUpdateRoleContribution = async () => {
    try {
      setLoading(true);
      await axiosInstance.put(`project/contribution/${contribution.id}`, {
        roleId,
      });
      queryClient.invalidateQueries({
        queryKey: [QueryCaches.PROJECTS_CONTRIBUTORS],
      });
    } catch (error: ApiError) {
      window.alert(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div key={contribution.id} className="flex gap-x-3 items-end p-2 mb-2">
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
      <div>
        <label className="block">
          <select
            className="w-full"
            value={roleId}
            onChange={(e) => setRoleId(e.target.value)}
          >
            {roles &&
              roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.description}
                </option>
              ))}
          </select>
        </label>
      </div>
      <Button
        onClick={handleUpdateRoleContribution}
        size="small"
        disabled={roleId === contribution.roleId || loading}
      >
        <div>Salvar</div>
      </Button>
      <Button
        onClick={handleUpdateRoleContribution}
        size="small"
        disabled={roleId === contribution.roleId || loading}
      >
        <div>Salvar</div>
      </Button>
    </div>
  );
};
