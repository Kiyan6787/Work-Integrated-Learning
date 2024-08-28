import React from 'react'
import SettingsForm from './SettingsForm'
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from '@/lib/prisma/prismadb';

export default async function page() {
    const session: any = await getServerSession(authOptions);

    const userInfo = await prisma.user.findUnique({
        where: {
            id: session.user.id
        },
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          role: true,
        }
    })

  return (
    <>
      <SettingsForm userInfo={await userInfo} />
    </>
  );
}

