import bcrypt from "bcrypt";
import prisma from "@/lib/prisma/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: any) {
  const body = await req.json();
  const { name, email, role, password } = body.data;

  if (!email || !password) {
    return NextResponse.json({ message: "Missing Fields", status: 400 });
  }

  const unique = await prisma.user
    .findUnique({
      where: { email: email },
    })
    .finally(() => prisma.$disconnect());

  if (unique) {
    return NextResponse.json({ message: "User already exists", status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user
    .create({
      data: {
        email: email,
        name: name,
        image:
          "https://wil-management.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fpaws-avatar.87f01969.jpg&w=1080&q=75",
        role: role,
        hashedPassword: hashedPassword,
      },
    })
    .finally(() => prisma.$disconnect());

  return NextResponse.json({ user: user, status: 200 });
}
