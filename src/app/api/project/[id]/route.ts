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
    return NextResponse.json({ message: "session not found" }, { status: 401 });
  }

  if (!id) {
    return NextResponse.json(
      {
        message: "id are required",
      },
      { status: 400 }
    );
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
      { message: "you don't have access to this project" },
      { status: 403 }
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
    return NextResponse.json({ message: "project not found" }, { status: 404 });
  }

  return NextResponse.json({ ...project, role: projectContribution.role });
}

export async function DELETE(_req: Request, context: { params: IParams }) {
  const session = await getServerSession(authOptions);
  const { id } = context.params;

  if (!session || !session.user.id || !id) {
    return NextResponse.json({ message: "session not found" }, { status: 401 });
  }

  if (!id) {
    return NextResponse.json(
      {
        message: "id are required",
      },
      { status: 400 }
    );
  }

  let project = await prisma.project.findFirst({
    where: {
      id,
      // userId: session.user.id,
    },
  });

  if (!project) {
    return NextResponse.json(
      {
        message: "project not found",
      },
      { status: 404 }
    );
  }

  await prisma.project.delete({
    where: {
      id,
      // userId: session.user.id,
    },
  });

  return NextResponse.json(
    {
      message: "Successfully deleted project",
    },
    { status: 200 }
  );
}

interface IParams {
  id: string;
}
