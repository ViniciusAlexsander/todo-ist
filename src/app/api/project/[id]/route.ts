import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/shared/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function GET(req: Request, context: { params: any }) {
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

  return NextResponse.json(project);
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
