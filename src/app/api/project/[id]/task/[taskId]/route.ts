import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/shared/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../auth/[...nextauth]/options";

interface IParams {
  id: string;
  taskId: string;
}

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

export async function POST(req: Request, context: { params: IParams }) {
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

export async function DELETE(req: Request, context: { params: any }) {
  const session = await getServerSession(authOptions);
  const id = context.params.id;

  if (!session) {
    return NextResponse.json({ status: 401 });
  }

  if (!id) {
    return NextResponse.json({
      message: "id are required",
    });
  }

  let project = await prisma.project.findFirst({
    where: {
      id,
    },
  });

  if (!project) {
    return NextResponse.json({
      message: "project not found",
    });
  }

  await prisma.project.delete({
    where: {
      id,
    },
  });

  return NextResponse.json({
    message: "Successfully deleted project",
  });
}
