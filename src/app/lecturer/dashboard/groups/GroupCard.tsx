import Link from "next/link";
import prisma from "@/lib/prisma/prismadb";
import { revalidatePath } from "next/cache";

export default async function GroupCard() {
  const groups = await prisma.groups
    .findMany(
      { include: { members: true } },
    )
    .finally(() => prisma.$disconnect());
  revalidatePath("/lecturer/dashboard/groups/group-members");

  return (
    <>
      {groups?.map((group) => {
        return (
          <div
            key={group.id}
            className="dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl bg-white py-6 px-8 shadow-default "
          >
            <div className="mt-0 flex items-end justify-between">
              <div className="flex flex-col">
                <h4 className="text-title-ms font-bold text-black dark:text-white">
                  Group: {group.groupNumber}
                </h4>
                <span className="text-sm font-medium">
                  Members: {group.members.length}/6
                </span>
              </div>

              <Link
                href={{
                  pathname: "/lecturer/dashboard/groups/group-members",
                  query: { id: group.id },
                }}
                className="inline-flex bg-primary items-center justify-center align-middle px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-meta-5 focus:ring-4 focus:outline-none"
              >
                View
                <svg
                  className="w-3.5 h-3.5 ml-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </Link>
            </div>
          </div>
        );
      })}
    </>
  );
}
