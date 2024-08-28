import React from "react";
import prisma from "@/lib/prisma/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ProjectApplication from "./components/ProjectApplication/ProjectApplication";

export default async function Page() {
  const session: any = await getServerSession(authOptions);

  //get student group id from prisma student
  const studentGroup: any = await prisma.user
    .findUnique({
      where: {
        id: await session?.user.id,
      },
      select: {
        groupId: true,
      },
    })
    .then((result) => result?.groupId)
    .finally(() => prisma.$disconnect());

  const groupProjectId: any = await prisma.groups
    .findUnique({
      where: {
        id: await studentGroup,
      },
      select: {
        projectId: true,
      },
    })
    .then((result) => result?.projectId)
    .finally(() => prisma.$disconnect());

  return (
    <>
      {(await groupProjectId) === "" || (await groupProjectId) === null ? (
        <div className="flex py-5 justify-end">
          <a
            className="block text-white shadow-lg hover:shadow-xl bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none   font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700  "
            href="/student/dashboard/project/select-project"
          >
            Select a Project
          </a>
        </div>
      ) : (
        <>
          <div className="flex py-5 justify-between">
            <a
              className="block text-white shadow-lg hover:shadow-xl bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none   font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700  "
              href={`/student/dashboard/project/project-details?id=${groupProjectId}`}
            >
              Project Details
            </a>
            <a
              className="block text-white shadow-lg hover:shadow-xl bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none   font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700  "
              href="/student/dashboard/my-group"
            >
              My Group
            </a>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-2 2xl:gap-8 m-auto">
            <ProjectApplication
              projectId={await groupProjectId}
              groupId={await studentGroup}
            />
          </div>
        </>
      )}
    </>
  );
}
