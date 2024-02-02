import prisma from "@/shared/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

export interface IPutRequest {
  roleId: string;
}

interface IParams {
  id: string;
}

export async function PUT(req: Request, context: { params: IParams }) {
  const session = await getServerSession(authOptions);
  const { id } = context.params;
  const { roleId }: Partial<IPutRequest> = await req.json();

  if (!session) {
    return NextResponse.json({ message: "session not found" }, { status: 401 });
  }

  if (!id || !roleId) {
    return NextResponse.json(
      {
        message: "id and roleId are required",
      },
      { status: 400 }
    );
  }

  let projectContribution = await prisma.project_Contribution.findFirst({
    where: {
      id: id,
    },
  });

  let roleExists = await prisma.role.findFirst({
    where: {
      id: roleId,
    },
  });

  if (!roleExists) {
    return NextResponse.json(
      {
        message: "roleId not represents any role",
      },
      { status: 404 }
    );
  }

  if (!projectContribution) {
    return NextResponse.json(
      {
        message: "project contribution not found",
      },
      { status: 404 }
    );
  }

  await prisma.project_Contribution.update({
    data: {
      roleId: roleId || projectContribution.roleId,
    },
    where: {
      id: id,
    },
  });

  return NextResponse.json(
    { message: "Successfully updated contribution" },
    { status: 200 }
  );
}
