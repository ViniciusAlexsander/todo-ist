import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const roles = await prisma.role.findMany();

  return NextResponse.json(roles);
}
