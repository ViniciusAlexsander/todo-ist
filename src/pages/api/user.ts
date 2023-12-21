import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../shared/lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const result = await prisma.user.create({
    data: {
      ...req.body,
    },
  });
  return res.status(201).json(result);
}
