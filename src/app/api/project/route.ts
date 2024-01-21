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
    return NextResponse.json({ status: 401 });
  }

  if (!description || !name) {
    return NextResponse.json({
      message: "description, userId and name are required",
    });
  }

  const newProject = await prisma.project.create({
    data: {
      description,
      name,
      user: {
        connect: {
          id: session.user.id,
        },
      },
    },
  });

  return NextResponse.json({ id: newProject.id });
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  // if (!session) {
  //   return NextResponse.json({ status: 401 });
  // }

  const users = await prisma.project.findMany({
    include: {
      projectContribution: {
        include: {
          user: true,
        },
      },
    },
  });

  return NextResponse.json(users);
}
