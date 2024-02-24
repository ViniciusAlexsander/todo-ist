// import prisma from "@/shared/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

export async function GET(_req: Request, context: { params: IParams }) {
  const session = await getServerSession(authOptions);
  const { id, taskId } = context.params;

  if (!session) {
    return NextResponse.json({ message: "session not found" }, { status: 401 });
  }

  if (!id || !taskId) {
    return NextResponse.json(
      {
        message: "id and taskId are required",
      },
      { status: 400 }
    );
  }

  // const task = await prisma.task.findFirst({
  //   include: {
  //     status: true,
  //   },
  //   where: {
  //     id: taskId,
  //   },
  // });

  // if (!task) {
  //   return NextResponse.json(
  //     {
  //       message: "task not found",
  //     },
  //     { status: 404 }
  //   );
  // }

  // return NextResponse.json(task);
}

export async function DELETE(_req: Request, context: { params: IParams }) {
  const session = await getServerSession(authOptions);
  const { id: projectId, taskId } = context.params;

  if (!session) {
    return NextResponse.json({ message: "session not found" }, { status: 401 });
  }

  if (!projectId || !taskId) {
    return NextResponse.json(
      {
        message: "taskId are required",
      },
      { status: 400 }
    );
  }

  // let task = await prisma.task.findFirst({
  //   where: {
  //     id: taskId,
  //   },
  // });

  // if (!task) {
  //   return NextResponse.json(
  //     {
  //       message: "task not found",
  //     },
  //     { status: 404 }
  //   );
  // }

  // await prisma.task.delete({
  //   where: {
  //     id: taskId,
  //   },
  // });

  return NextResponse.json(
    {
      message: "Successfully deleted",
    },
    { status: 200 }
  );
}

export interface IPutRequest {
  name: string;
  description?: string;
  statusId: string;
}

export async function PUT(req: Request, context: { params: IParams }) {
  const session = await getServerSession(authOptions);
  const { id: projectId, taskId } = context.params;
  const { description, name, statusId }: Partial<IPutRequest> =
    await req.json();

  if (!session) {
    return NextResponse.json({ message: "session not found" }, { status: 401 });
  }

  if (!projectId || !taskId) {
    return NextResponse.json(
      {
        message: "taskId are required",
      },
      { status: 400 }
    );
  }

  // let task = await prisma.task.findFirst({
  //   where: {
  //     id: taskId,
  //   },
  // });

  // if (!task) {
  //   return NextResponse.json(
  //     {
  //       message: "task not found",
  //     },
  //     { status: 404 }
  //   );
  // }

  // await prisma.task.update({
  //   data: {
  //     description: description || task.description,
  //     name: name || task.name,
  //     statusId: statusId || task.statusId,
  //   },
  //   where: {
  //     id: taskId,
  //   },
  // });

  return NextResponse.json(
    { message: "Successfully updated task" },
    { status: 200 }
  );
}

interface IParams {
  id: string;
  taskId: string;
}
