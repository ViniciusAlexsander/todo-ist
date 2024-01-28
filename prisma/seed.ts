import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.$transaction([
    prisma.task_Status.create({
      data: {
        name: "TODO",
        id: "clrslqlgy0000j6ej0c2lxdbp",
      },
    }),
    prisma.task_Status.create({
      data: {
        name: "DONE",
        id: "clrslqlgz0002j6ejvujc157u",
      },
    }),
    prisma.task_Status.create({
      data: {
        name: "IN_PROGRESS",
        id: "clrslqlgz0001j6ejapd8tiuq",
      },
    }),
  ]);

  // const [
  //   editProject,
  //   listProject,
  //   deleteProject,
  //   inviteProject,
  //   removeProject,
  //   createTasks,
  //   editTasks,
  //   deleteTasks,
  // ] = await prisma.$transaction([
  //   prisma.permission.create({
  //     data: {
  //       description: "Edit a project",
  //     },
  //   }),
  //   prisma.permission.create({
  //     data: {
  //       description: "List a project",
  //     },
  //   }),
  //   prisma.permission.create({
  //     data: {
  //       description: "Delete the project",
  //     },
  //   }),
  //   prisma.permission.create({
  //     data: {
  //       description: "Invite users to the project",
  //     },
  //   }),
  //   prisma.permission.create({
  //     data: {
  //       description: "Remove users from the project",
  //     },
  //   }),
  //   prisma.permission.create({
  //     data: {
  //       description: "Create tasks",
  //     },
  //   }),
  //   prisma.permission.create({
  //     data: {
  //       description: "Edit tasks",
  //     },
  //   }),
  //   prisma.permission.create({
  //     data: {
  //       description: "Delete tasks",
  //     },
  //   }),
  // ]);

  // const [superAdmin, admin, member] = await prisma.$transaction([
  //   prisma.role.create({
  //     data: {
  //       description: "Super Admin",
  //     },
  //   }),
  //   prisma.role.create({
  //     data: {
  //       description: "Admin",
  //     },
  //   }),
  //   prisma.role.create({
  //     data: {
  //       description: "Member",
  //     },
  //   }),
  // ]);

  // await prisma.$transaction([
  //   //edit project permissions
  //   prisma.role_Permission.create({
  //     data: {
  //       permissionId: editProject.id,
  //       roleId: superAdmin.id,
  //     },
  //   }),
  //   prisma.role_Permission.create({
  //     data: {
  //       permissionId: editProject.id,
  //       roleId: admin.id,
  //     },
  //   }),
  //   //list
  //   prisma.role_Permission.create({
  //     data: {
  //       permissionId: listProject.id,
  //       roleId: superAdmin.id,
  //     },
  //   }),
  //   prisma.role_Permission.create({
  //     data: {
  //       permissionId: listProject.id,
  //       roleId: admin.id,
  //     },
  //   }),
  //   prisma.role_Permission.create({
  //     data: {
  //       permissionId: listProject.id,
  //       roleId: member.id,
  //     },
  //   }),
  //   //delete project
  //   prisma.role_Permission.create({
  //     data: {
  //       permissionId: deleteProject.id,
  //       roleId: superAdmin.id,
  //     },
  //   }),
  //   //invite to project
  //   prisma.role_Permission.create({
  //     data: {
  //       permissionId: inviteProject.id,
  //       roleId: superAdmin.id,
  //     },
  //   }),
  //   prisma.role_Permission.create({
  //     data: {
  //       permissionId: inviteProject.id,
  //       roleId: admin.id,
  //     },
  //   }),
  //   //remove to project
  //   prisma.role_Permission.create({
  //     data: {
  //       permissionId: removeProject.id,
  //       roleId: superAdmin.id,
  //     },
  //   }),
  //   prisma.role_Permission.create({
  //     data: {
  //       permissionId: removeProject.id,
  //       roleId: admin.id,
  //     },
  //   }),
  //   //create tasks
  //   prisma.role_Permission.create({
  //     data: {
  //       permissionId: createTasks.id,
  //       roleId: superAdmin.id,
  //     },
  //   }),
  //   prisma.role_Permission.create({
  //     data: {
  //       permissionId: createTasks.id,
  //       roleId: admin.id,
  //     },
  //   }),
  //   prisma.role_Permission.create({
  //     data: {
  //       permissionId: createTasks.id,
  //       roleId: member.id,
  //     },
  //   }),
  //   //edit tasks
  //   prisma.role_Permission.create({
  //     data: {
  //       permissionId: editTasks.id,
  //       roleId: superAdmin.id,
  //     },
  //   }),
  //   prisma.role_Permission.create({
  //     data: {
  //       permissionId: editTasks.id,
  //       roleId: admin.id,
  //     },
  //   }),
  //   prisma.role_Permission.create({
  //     data: {
  //       permissionId: editTasks.id,
  //       roleId: member.id,
  //     },
  //   }),
  //   //delete tasks
  //   prisma.role_Permission.create({
  //     data: {
  //       permissionId: deleteTasks.id,
  //       roleId: superAdmin.id,
  //     },
  //   }),
  //   prisma.role_Permission.create({
  //     data: {
  //       permissionId: deleteTasks.id,
  //       roleId: admin.id,
  //     },
  //   }),
  //   prisma.role_Permission.create({
  //     data: {
  //       permissionId: deleteTasks.id,
  //       roleId: member.id,
  //     },
  //   }),
  //   //delete tasks
  //   prisma.role_Permission.create({
  //     data: {
  //       permissionId: editTasks.id,
  //       roleId: superAdmin.id,
  //     },
  //   }),
  //   prisma.role_Permission.create({
  //     data: {
  //       permissionId: editTasks.id,
  //       roleId: admin.id,
  //     },
  //   }),
  //   prisma.role_Permission.create({
  //     data: {
  //       permissionId: editTasks.id,
  //       roleId: member.id,
  //     },
  //   }),
  // ]);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
