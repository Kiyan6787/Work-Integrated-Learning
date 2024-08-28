import prisma from "@/lib/prisma/prismadb";

export default function Cards({ GroupId }: { GroupId: string | null }) {
  const CardData = [
    {
      id: 1,
      heading: "Active Tasks",
      subheading: "Number of Tasks",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
          />
        </svg>
      ),
      value:
        GroupId == null
          ? 0
          : GroupId == ""
          ? 0
          : prisma.groups
              .findUnique({
                where: {
                  id: GroupId,
                },
                select: {
                  members: {
                    select: {
                      id: true,
                    },
                  },
                },
              })
              .then((result) => result?.members.length),
    },
    {
      id: 2,
      heading: "Team members",
      subheading: "Total Members",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
          />
        </svg>
      ),
      value:
        GroupId == null
          ? 0
          : GroupId == ""
          ? 0
          : prisma.groups
              .findUnique({
                where: {
                  id: GroupId,
                },
                select: {
                  members: {
                    select: {
                      id: true,
                    },
                  },
                },
              })
              .then((result) => result?.members.length),
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
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