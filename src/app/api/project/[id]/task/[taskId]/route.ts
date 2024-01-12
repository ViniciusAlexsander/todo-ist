import { prisma } from "@/shared/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../../../auth/[...nextauth]/options";

// const get = (req, context) => createApiMethod(req, context, (session) => {

// })
export async function GET(req: Request, context: { params: IParams }) {
  const session = await getServerSession(authOptions);
  const { id, taskId } = context.params;

  // if (!session) {
  //   return NextResponse.json({ status: 401 });
  // }

  if (!id || !taskId) {
    return NextResponse.json({
      message: "id and taskId are required",
    });
  }

  const task = await prisma.task.findFirst({
    include: {
      status: true,
    },
    where: {
      id: taskId,
    },
  });

  if (!task) {
    return NextResponse.json({
      message: "task not found",
    });
  }

  return NextResponse.json(task);
}

export async function DELETE(req: Request, context: { params: IParams }) {
  const session = await getServerSession(authOptions);
  const { id: projectId, taskId } = context.params;

  // if (!session) {
  //   return NextResponse.json({ status: 401 });
  // }

  if (!projectId) {
    return NextResponse.json({
      message: "taskId are required",
    });
  }

  let task = await prisma.task.findFirst({
    where: {
      id: taskId,
    },
  });

  if (!task) {
    return NextResponse.json({
      message: "task not found",
    });
  }

  await prisma.task.delete({
    where: {
      id: taskId,
    },
  });

  return NextResponse.json({
    message: "Successfully deleted task",
  });
}

interface IParams {
  id: string;
  taskId: string;
}
