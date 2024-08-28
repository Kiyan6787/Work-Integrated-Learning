import prisma from "@/lib/prisma/prismadb";
import Link from "next/link";

const FileCard = async () => {
  const files = await prisma.attachment
    .findMany({
      orderBy: {
        createdAt: "desc", // Use 'asc' for ascending order
      },
    })
    .finally(() => {
      prisma.$disconnect();
    });

  return (
    <>
      {files.map((file) => {
        return (
          <div
            key={file.id}
            className="dark:bg-gray-800 rounded-md bg-white py-6 px-8 shadow-md hover:shadow-lg transition duration-300 ease-in-out"
          >
            <div className="mt-0 flex items-end justify-between">
              <div className="flex flex-col">
                <h4 className="text-title-ms font-bold text-black dark:text-white">
                  {file.title}
                </h4>
                <span className="text-sm font-medium">
                  {file.description}
                </span>
                <span className="text-xs font-medium">
                  {new Date(file.createdAt).toDateString()}
                </span>
              </div>

              <Link
                href={file.url}
                target="_blank"
                className="inline-flex bg-primary items-center justify-center align-middle px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-meta-5 focus:ring-4 focus:outline-none"
              >
                Download
                <svg
                  className="w-3.5 h-3.5 ml-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 16"
                >
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M14,9 C14.5523,9 15,9.44772 15,10 L15,13 C15,14.1046 14.1046,15 13,15 L3,15 C1.89543,15 1,14.1046 1,13 L1,10 C1,9.44772 1.44772,9 2,9 C2.55228,9 3,9.44771 3,10 L3,13 L13,13 L13,10 C13,9.44771 13.4477,9 14,9 Z M8,1 C8.55228,1 9,1.44772 9,2 L9,6.58579 L10.2929,5.29289 C10.6834,4.90237 11.3166,4.90237 11.7071,5.29289 C12.0976,5.68342 12.0976,6.31658 11.7071,6.70711 L8,10.4142 L4.29289,6.70711 C3.90237,6.31658 3.90237,5.68342 4.29289,5.29289 C4.68342,4.90237 5.31658,4.90237 5.70711,5.29289 L7,6.58579 L7,2 C7,1.44772 7.44772,1 8,1 Z"
                  />
                </svg>
              </Link>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default FileCard;
