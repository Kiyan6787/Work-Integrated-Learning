import React from "react";
import Cards from "./components/cards/Cards";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma/prismadb";
import { revalidatePath } from "next/cache";

export default async function page() {
  const session: any = await getServerSession(authOptions);
  const userId: string = await session.user.id;
  const submissions: any = await prisma.submission.findMany({
    where: {
      lecturerId: userId,
    },
  });

if(await submissions.length == 0) {
    await prisma.submission.create({
        data: {
            lecturerId: await session.user.id,
            code: null,
            documentation: null,
        },
    })
    revalidatePath('/lecturer/dashboard/submission')
}

  return (
    <>
      <Cards submissions={submissions} />
    </>
  );
}
