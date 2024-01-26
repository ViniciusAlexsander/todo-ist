import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "@/shared/lib/prisma";
import { authOptions } from "../../auth/[...nextauth]/options";

// const get = (req, context) => createApiMethod(req, context, (session) => {

// })

export async function GET(_req: Request, context: { params: IParams }) {
  const session = await getServerSession(authOptions);
  const { id } = context.params;

  if (!session || !session.user.id || !id) {
    return NextResponse.json({ error: "session not found" }, { status: 401 });
  }

  if (!id) {
    return NextResponse.json({
      message: "id are required",
    });
  }

  const projectContribution = await prisma.project_Contribution.findFirst({
    select: {
      role: {
        include: {
          rolePermission: {
            select: {
              permission: true,
            },
          },
        },
      },
    },
    where: {
      userId: session.user.id,
      AND: {
        projectId: id,
      },
    },
  });

  if (!projectContribution) {
    return NextResponse.json(
      { error: "you don't have access to this project" },
      { status: 500 }
    );
  }

  const project = await prisma.project.findFirst({
    include: {
      projectContribution: {
        include: {
          user: true,
        },
      },
      tasks: {
        include: {
          status: true,
        },
      },
    },
    where: {
      id,
    },
  });

  if (!project) {
    return NextResponse.json({ error: "project not found" }, { status: 500 });
  }

  return NextResponse.json({ ...project, role: projectContribution.role });
}

export async function DELETE(_req: Request, context: { params: IParams }) {
  const session = await getServerSession(authOptions);
  const { id } = context.params;

  if (!session || !session.user.id || !id) {
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
      userId: session.user.id,
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
      userId: session.user.id,
    },
  });

  return NextResponse.json({
    message: "Successfully deleted project",
  });
}

interface IParams {
  id: string;
}
