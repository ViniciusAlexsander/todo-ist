import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  return NextResponse.json([
    {
      id: "clrsiecq50000weg7bzf1ief8",
      description: "Owner",
    },
    {
      id: "clrsiecq50001weg7mj0orq66",
      description: "Admin",
    },
    {
      id: "clrsiecq50002weg76ha3ut1u",
      description: "Member",
    },
    {
      id: "clrsiecq50002weg76ha3ut1u",
      description: "teste",
    },
  ]);
}
