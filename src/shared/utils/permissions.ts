import { PermissionsEnum } from "@/shared/enum/permissionsEnum";
import { RolePermission } from "@/shared/models/project";

export const verifyPermission = (
  rolePermissions: RolePermission[],
  permission: PermissionsEnum
) => {
  let hadPermission = rolePermissions.find(
    (rolePermission: RolePermission) =>
      rolePermission.permission.description === permission
  );

  return !!hadPermission;
};
