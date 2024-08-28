import React from "react";
import UserCard from "./UserCard";
import prisma from "@/lib/prisma/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function page() {
  const session: any = await getServerSession(authOptions);

  //get student group id from prisma student
  const studentGroupId: any = await prisma.user
    .findUnique({
      where: {
        id: await session?.user.id,
      },
      select: {
        groupId: true,
      },
    })
    .then((result) => {
      if (result === null || result.groupId === null) {
        // throw new Error("User group is null");
        return null;
      }
      return result.groupId;
    })
    .finally(() => prisma.$disconnect());

  const groupMembers: any = await prisma.groups
    .findUnique({
      where: {
        id: await studentGroupId,
      },
      include: {
        members: true,
      },
    })
    .then((result) => result?.members)
    .finally(() => prisma.$disconnect());

  return (
    <>
      {(await studentGroupId) === "" || (await studentGroupId) === null ? (
        <div className="flex py-5 justify-end">
          <a
            className="block text-white shadow-lg hover:shadow-xl bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none   font-medium rounded-lg text-sm px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700  "
            href="/student/dashboard/my-group/join-group"
          >
            Join A Group
          </a>
        </div>
      ) : (
        <>
          <div className="flex py-5 justify-end">
            <a
              className="block text-white shadow-lg hover:shadow-xl bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none   font-medium rounded-lg text-sm px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700  "
              href="/student/dashboard/project"
            >
              Project
            </a>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-8 m-auto">
            <UserCard group={await groupMembers} />
          </div>
        </>
      )}
    </>
  );
}
