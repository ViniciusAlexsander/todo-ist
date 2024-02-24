// import prisma from "@/shared/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  // if (!session || !session.user) {
  //   return NextResponse.json({ error: "session not found" }, { status: 401 });
  // }

  // const roles = await prisma.role.findMany();

  // return NextResponse.json(roles);
}
