import prisma from "@/shared/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../../auth/[...nextauth]/options";

// const get = (req, context) => createApiMethod(req, context, (session) => {

// })

export interface IPostRequest {
  name: string;
  description?: string;
  statusId: string;
}

export async function POST(req: Request, context: { params: IParams }) {
  const session = await getServerSession(authOptions);
  const {
    description = "",
    name,
    statusId,
  }: Partial<IPostRequest> = await req.json();
  const { id: projectId } = context.params;

  if (!session) {
    return NextResponse.json({ status: 401 });
  }

  if (!name || !projectId || !statusId) {
    return NextResponse.json({
      message: "name, projectId and statusId are required",
    });
  }

  const project = await prisma.project.findFirst({
    where: {
      id: projectId,
      // userId: session.user.id,
    },
  });

  if (!project) {
    return NextResponse.json({
      message: "project with this id not found",
    });
  }

  const newTask = await prisma.task.create({
    data: { name, projectId, statusId, description: description },
  });

  return NextResponse.json(newTask);
}

export async function GET(_req: Request, context: { params: IParams }) {
  const session = await getServerSession(authOptions);
  const { id: projectId } = context.params;

  // if (!session || projectId) {
  //   return NextResponse.json({ status: 401 });
  // }

  if (!projectId) {
    return NextResponse.json({
      message: "projectId is required",
    });
  }

  const tasks = await prisma.task.findMany({
    where: {
      projectId,
      project: {
        // userId: session.user.id,
      },
    },
  });

  return NextResponse.json(tasks);
}

interface IParams {
  id: string;
}
