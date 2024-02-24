// import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { IUserOutput } from "../../../shared/ports/user/getUserOutput";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  // const session = await getServerSession(authOptions);
  const email = req.nextUrl.searchParams.get("email");

  // if (!session || !session.user) {
  //   return NextResponse.json({ error: "session not found" }, { status: 401 });
  // }

  if (!email) {
    return NextResponse.json({ error: "email is required" }, { status: 500 });
  }

  const users: IUserOutput[] = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
    },
    where: {
      email: {
        contains: email,
        mode: "insensitive",
      },
    },
  });

  // return NextResponse.json(
  //   users.filter((user) => user.id !== session?.user.id)
  // );
  return NextResponse.json(users);
}
