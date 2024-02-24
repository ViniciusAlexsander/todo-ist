import { Button } from "@/components/Button";
import { TrashIcon } from "@/components/Icons";
import { IProjectContribution } from "@/shared/models/projectContributors";
import {
  useDeleteContribution,
  useUpdateRoleContribution,
} from "@/shared/services/projectContributors";
import { useRoles } from "@/shared/services/roles";
import Image from "next/image";
import { useState } from "react";

interface ICardColaboratorProps {
  contribution: IProjectContribution;
}

export const CardColaborator = ({ contribution }: ICardColaboratorProps) => {
  const [roleId, setRoleId] = useState<string>(contribution.role.id);

  const { data: roles } = useRoles();

  const { mutate: updateRoleContribution } = useUpdateRoleContribution({
    projectId: contribution.projectId,
  });

  const handleUpdateRoleContribution = async () => {
    updateRoleContribution({
      contributionId: contribution.id,
      roleId,
    });
  };

  const { mutate: deleteContribution } = useDeleteContribution({
    projectId: contribution.projectId,
  });

  const handleDeleteContribution = async () => {
    deleteContribution({
      contributionId: contribution.id,
    });
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
        disabled={roleId === contribution.roleId}
      >
        Salvar
      </Button>
      <Button onClick={handleDeleteContribution} size="small">
        <TrashIcon />
      </Button>
    </div>
  );
};
