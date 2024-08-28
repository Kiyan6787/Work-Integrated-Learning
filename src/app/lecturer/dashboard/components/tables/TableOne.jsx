import Image from "next/image";
import prisma from "@/lib/prisma/prismadb";
import HelpAvatar from "../../../../../../public/images/ngo-avaters/help-avater.jpg";

export default async function TableOne() {
  const ngos = await prisma.user
    .findMany({
      where: {
        role: "ngo",
      },
    })
    .finally(() => prisma.$disconnect());

  return (
    <>
      <div className=" col-span-12 w-full p-4 bg-white shadow-md  rounded-lg hover:shadow-lg sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
            Registered NGOs
          </h5>
          {ngos.length > 10 ? (
            <a
              href="#"
              className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
            >
              View all
            </a>
          ) : null}
        </div>
        <div className="flow-root">
          <ul
            role="list"
            className="divide-y divide-gray-200 dark:divide-gray-700"
          >
            {ngos.map((ngo) => {
              return (
                <>
                  <li key={ngo.id} className="py-3 sm:py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <Image
                          className="w-14 h-14 rounded-full"
                          src={ngo.image ? ngo.image : HelpAvatar}
                          width={56}
                          height={56}
                          alt="Neil image"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                          {ngo.name}
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                          {ngo.email}
                        </p>
                      </div>
                      <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        <a
                          href="/lecturer/dashboard/groups/group-members"
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
                        </a>
                      </div>
                    </div>
                  </li>
                </>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
