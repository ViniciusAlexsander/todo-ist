
// import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export interface IPutRequest {
  roleId: string;
}

interface IParams {
  id: string;
}

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(req: Request, context: { params: IParams }) {
  // const session = await getServerSession(authOptions);
  const { id } = context.params;
  const { roleId }: Partial<IPutRequest> = await req.json();

  // if (!session) {
  //   return NextResponse.json({ message: "session not found" }, { status: 401 });
  // }

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

export async function DELETE(req: Request, context: { params: IParams }) {
  // const session = await getServerSession(authOptions);
  const { id } = context.params;

  // if (!session) {
  //   return NextResponse.json({ message: "session not found" }, { status: 401 });
  // }

  if (!id) {
    return NextResponse.json(
      {
        message: "id is required",
      },
      { status: 400 }
    );
  }

  let projectContribution = await prisma.project_Contribution.findFirst({
    where: {
      id: id,
    },
  });

  if (!projectContribution) {
    return NextResponse.json(
      {
        message: "project contribution not found",
      },
      { status: 404 }
    );
  }

  await prisma.project_Contribution.delete({
    where: {
      id: projectContribution.id,
    },
  });

  return NextResponse.json(
    { message: "Successfully delete contribution" },
    { status: 200 }
  );
}
