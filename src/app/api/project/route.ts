import prisma from "@/shared/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";

export interface IProject {
  userId: string;
  name: string;
  description: string;
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const { description, name }: Partial<IProject> = await req.json();

  if (!session) {
    return NextResponse.json({ message: "session not found" }, { status: 401 });
  }

  if (!description || !name) {
    return NextResponse.json(
      {
        message: "description, userId and name are required",
      },
      { status: 400 }
    );
  }

  const [newProject, ownerRole] = await prisma.$transaction([
    prisma.project.create({
      data: {
        description,
        name,
        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
    }),
    prisma.role.findFirst({
      where: {
        description: "Owner",
      },
    }),
  ]);

  if (!ownerRole) {
    return NextResponse.json(
      { message: "ownerRole not found" },
      { status: 400 }
    );
  }

  const projectContribution = await prisma.project_Contribution.create({
    data: {
      projectId: newProject.id,
      userId: session.user.id,
      roleId: ownerRole?.id,
    },
  });

  return NextResponse.json(
    { message: "Successfully created" },
    { status: 201 }
  );
}

export async function GET(_req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ message: "session not found" }, { status: 401 });
  }

  const projectContribution = await prisma.project_Contribution.findMany({
    include: {
      project: {
        include: {
          user: true,
        },
      },
    },
    where: {
      userId: session.user.id,
    },
  });

  const project = projectContribution.map(
    (projectContribution) => projectContribution.project
  );

  return NextResponse.json(project);
}
