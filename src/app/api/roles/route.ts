import prisma from "@/shared/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const roles = await prisma.role.findMany();

  return NextResponse.json(roles);
}
