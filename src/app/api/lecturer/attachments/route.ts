import { NextResponse } from "next/server";
import prisma from '@/lib/prisma/prismadb'
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const currentUser = await getCurrentUser();
    const { url, title, description } = await req.json();

    if (!currentUser) {
      return new NextResponse("Unauthorised", { status: 401 });
    }

    const attachment = await prisma.attachment.create({
      data: {
        url,
        name: url.split("/").pop(),
        title,
        description,
      }
    });

    return NextResponse.json(attachment);

  } catch (err) {
    console.log("FILE_ATTACHMENTS", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}