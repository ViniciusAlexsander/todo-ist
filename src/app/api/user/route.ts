import prisma from "@/shared/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const name = req.nextUrl.searchParams.get("name");

  if (!session) {
    return NextResponse.json({ status: 401 });
  }

  if (!name) {
    return NextResponse.json({
      message: "name is required",
    });
  }

  const users = await prisma.user.findMany({
    where: {
      name: {
        contains: name,
        mode: "insensitive",
      },
    },
  });

  return NextResponse.json(users);
}
