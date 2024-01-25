import prisma from "@/shared/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

export interface IProjectContribution {
  userId: string;
  projectId: string;
  roleId: string;
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const { projectId, userId, roleId }: Partial<IProjectContribution> =
    await req.json();

  if (!session || !session.user) {
    return NextResponse.json({ error: "session not found" }, { status: 401 });
  }

  if (!projectId || !userId || !roleId) {
    return NextResponse.json(
      { error: "projectId, roleId and userId are required" },
      { status: 500 }
    );
  }

  const userExists = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  if (!userExists) {
    return NextResponse.json({ error: "user not found" }, { status: 500 });
  }

  const projectExists = await prisma.project.findFirst({
    where: {
      // userId: session.user.id,
      id: projectId,
    },
  });

  if (!projectExists) {
    return NextResponse.json({ error: "project not found" }, { status: 500 });
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
      { error: "This user is already contribution in this project" },
      { status: 500 }
    );
  }

  const newProjectContribution = await prisma.project_Contribution.create({
    data: {
      projectId,
      userId,
      roleId,
    },
  });

  return NextResponse.json({ id: newProjectContribution.id });
}
