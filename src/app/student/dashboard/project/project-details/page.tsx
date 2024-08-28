import React from "react";
import prisma from "@/lib/prisma/prismadb";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";

interface SearchParams {
  id: string;
}

async function Page({ searchParams }: { searchParams: SearchParams }) {
  const session: any = await getServerSession(authOptions);

  //get student group id from prisma student
  const studentGroup: any = await prisma.user
    .findUnique({
      where: {
        id: await session?.user.id,
      },
      select: {
        group: true,
      },
    })
    .then((result) => result?.group)
    .finally(() => prisma.$disconnect());

  const project = await prisma.projects
    .findUnique({
      where: {
        id: searchParams.id,
      },
    })
    .finally(() => prisma.$disconnect());

  const projectOwner = await prisma.user
    .findUnique({
      where: {
        id: project?.ownerId,
      },
    })
    .finally(() => prisma.$disconnect());

  async function assign() {
    "use server";
    await prisma.groups
      .update({
        where: {
          id: await studentGroup,
        },
        data: {
          projectId: searchParams.id,
        },
      })
      .finally(() => prisma.$disconnect());

    await prisma.projects
      .update({
        where: {
          id: searchParams.id,
        },
        data: {
          assignedTo: await studentGroup,
        },
      })
      .finally(() => prisma.$disconnect());

    revalidatePath(
      `/student/dashboard/project/project-details?id=${searchParams.id}`
    );
  }

  return (
    <>
      <div className="py-6 px-8 shadow-default  dark:bg-gray-800 rounded-lg">
        <div className="flex items-center">
          <div className="flex flex-col md:flex-row items-center mb-5 text-center md:text-left">
            <div>
              <span className="h-18 w-18 rounded-full">
                <Image
                  src={projectOwner?.image as string}
                  width={70}
                  height={70}
                  alt="User"
                  className="rounded-full"
                />
              </span>
            </div>
            <span className="block ml-4">
              <span className="block text-md font-bold text-black dark:text-white">
                {projectOwner?.email}
              </span>
              <span className="block text-sm text-gray-300">
                {projectOwner?.name}
              </span>
            </span>
          </div>
        </div>

        <div className="mt-0 flex items-end justify-between">
          <div className="flex flex-col w-full">
            <h4 className="text-title-md mb-4 font-bold text-black dark:text-white">
              Project: {project?.projectTitle}
            </h4>
            <hr></hr>
            <div className="mb-2">
              <h3 className="font-bold">Project brief</h3>
              <span className="text-md dark:text-gray-300">
                {project?.projectBrief}
              </span>
            </div>
            <hr></hr>
            <div className="mb-3">
              <h3 className="font-bold">Project requirements</h3>
              <span className="text-md dark:text-gray-300">
                {project?.projectRequirements}
              </span>
            </div>
            <hr></hr>
            <div className="flex flex-row justify-start md:justify-end gap-3 mt-5">
              {project?.assignedTo == null ||
              ("" && studentGroup != null) ||
              "" ? (
                <form action={assign}>
                  <button
                    type="submit"
                    className="inline-flex bg-primary items-center justify-center align-middle px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-meta-5 focus:ring-4 focus:outline-none"
                  >
                    Assign to group
                  </button>
                </form>
              ) : project?.assignedTo == studentGroup ? (
                <button
                  disabled
                  className="inline-flex bg-primary items-center justify-center align-middle px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-meta-5 focus:ring-4 focus:outline-none"
                >
                  You are assigned the project
                </button>
              ) : (
                <button
                  disabled
                  className="inline-flex bg-primary items-center justify-center align-middle px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-meta-5 focus:ring-4 focus:outline-none"
                >
                  Already assigned
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Page;
