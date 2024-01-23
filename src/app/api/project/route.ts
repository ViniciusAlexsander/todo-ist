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
  try {
    const session = await getServerSession(authOptions);
    const { description, name }: Partial<IProject> = await req.json();

    if (!session || !session.user) {
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
            id: "123",
          },
        },
      },
    });

    return NextResponse.json({ id: newProject.id });
  } catch (error) {
    return NextResponse.json({
      message: "error creating project",
    });
  }
}

export async function GET(_req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ status: 401 });
  }

  const projects = await prisma.project.findMany({
    include: {
      projectContribution: {
        include: {
          user: true,
        },
      },
    },
    where: {
      userId: session.user.id,
    },
  });

  return NextResponse.json(projects);
}
