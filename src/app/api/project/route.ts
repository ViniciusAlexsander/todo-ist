import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/shared/lib/prisma";
import { getServerSession } from "next-auth";
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
    data: { description, userId: session.user.id, name },
  });

  return NextResponse.json({ id: newProject.id });
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  // if (!session) {
  //   return NextResponse.json({ status: 401 });
  // }

  const users = await prisma.project.findMany();

  return NextResponse.json(users);
}