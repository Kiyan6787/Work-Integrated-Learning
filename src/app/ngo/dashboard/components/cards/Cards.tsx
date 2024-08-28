import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma/prismadb";

export default async function Cards() {
  const session: any = await getServerSession(authOptions);

  const activeProjects = await prisma.projects.count({
    where: {
      ownerId: await session.user.id,
      isApproved: "approved",
    },
  });

  const pendingProjects = await prisma.projects.count({
    where: {
      ownerId: await session.user.id,
      isApproved: "pending",
    },
  });

  const CardData = [
    {
      id: 1,
      heading: "Active Projects",
      subheading: "Number of Active Projects",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776"
          />
        </svg>
      ),
      value: activeProjects,
    },
    {
      id: 3,
      heading: "Pending Projects",
      subheading: "Number of pending Projects",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776"
          />
        </svg>
      ),
      value: pendingProjects,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-2 2xl:gap-8">
      {CardData.map((item) => {
        return (
          <div
            key={item.id}
            className="bg-white dark:bg-gray-800 rounded-md  dark:border-gray-700 p-6 shadow-md"
          >
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gray-300 dark:bg-gray-700">
              {item.icon}
            </div>
            <div className="mt-4 flex items-end justify-between">
              <div>
                <h4 className="text-lg font-semibold text-black dark:text-white">
                  {item.heading}
                </h4>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  {item.subheading}
                </span>
              </div>
              <span className="flex items-center gap-1 text-sm font-medium text-gray-600 dark:text-gray-300">
                {item.value}
                <svg
                  className="fill-current text-gray-600 dark:text-gray-300"
                  width="10"
                  height="11"
                  viewBox="0 0 10 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.35716 2.47737L0.908974 5.82987L5.0443e-07 4.94612L5 0.0848689L10 4.94612L9.09103 5.82987L5.64284 2.47737L5.64284 10.0849L4.35716 10.0849L4.35716 2.47737Z"
                    fill=""
                  />
                </svg>
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
