import prisma from "@/shared/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

interface IParams {
  id: string;
}

export async function GET(req: NextRequest, context: { params: IParams }) {
  const session = await getServerSession(authOptions);
  const { id } = context.params;

  if (!session || !session.user) {
    return NextResponse.json({ message: "session not found" }, { status: 401 });
  }

  const projectContributionExits = await prisma.project_Contribution.findFirst({
    where: {
      userId: session.user.id,
      AND: {
        projectId: id,
        AND: {
          role: {
            description: "Super Admin",
          },
        },
      },
    },
  });

  if (!projectContributionExits) {
    return NextResponse.json(
      {
        message:
          "this project does not exit or you dont have permission to access",
      },
      { status: 403 }
    );
  }

  const projectContributions = await prisma.project_Contribution.findMany({
    include: {
      role: true,
      user: true,
    },
    where: {
      projectId: id,
    },
  });

  return NextResponse.json(projectContributions);
}
