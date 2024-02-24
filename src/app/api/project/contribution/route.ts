// import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface IProjectContribution {
  userId: string;
  projectId: string;
  roleId: string;
}

export async function POST(req: NextRequest) {
  // const session = await getServerSession(authOptions);
  const { projectId, userId, roleId }: Partial<IProjectContribution> =
    await req.json();

  // if (!session || !session.user) {
  //   return NextResponse.json({ message: "session not found" }, { status: 401 });
  // }

  if (!projectId || !userId || !roleId) {
    return NextResponse.json(
      { message: "projectId, roleId and userId are required" },
      { status: 400 }
    );
  }

  const userExists = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  if (!userExists) {
    return NextResponse.json({ message: "user not found" }, { status: 404 });
  }

  const projectExists = await prisma.project.findFirst({
    where: {
      // userId: session.user.id,
      id: projectId,
    },
  });

  if (!projectExists) {
    return NextResponse.json({ message: "project not found" }, { status: 404 });
  }

  const projectContributionExists = await prisma.project_Contribution.findFirst(
    {
      where: {
        projectId,
        userId,
      },
    }
  );

  if (projectContributionExists) {
    return NextResponse.json(
      { message: "This user is already contribution in this project" },
      { status: 400 }
    );
  }

  await prisma.project_Contribution.create({
    data: {
      projectId,
      userId,
      roleId,
    },
  });

  return NextResponse.json(
    { message: "new contribution created" },
    { status: 201 }
  );
}
