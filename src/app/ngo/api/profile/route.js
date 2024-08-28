import prisma from "@/lib/prisma/prismadb";
import { NextResponse } from "next/server";

export async function GET(req) {
  const url = new URL(req.url);
  try {
    const user = await prisma.user
      .findUnique({
        where: {
          email: url.searchParams.get("email"),
        },
      })
      .finally(() => prisma.$disconnect());
    return Response.json(user);
  } catch (error) {
    throw new Error(error);
  }
}
