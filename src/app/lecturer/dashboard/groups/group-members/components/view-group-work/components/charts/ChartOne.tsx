import prisma from "@/lib/prisma/prismadb";
import LineChart from "./LineChart";

const ChartOne = async ({ GroupId }: { GroupId: string }) => {

  const groupProjectId: any = await prisma.groups
    .findUnique({
      where: {
        id: await GroupId,
      },
      select: {
        projectId: true,
      },
    })
    .then((result) => result?.projectId)
    .finally(() => prisma.$disconnect());

  if (
    groupProjectId === null ||
    groupProjectId === undefined ||
    groupProjectId === ""
  ) {
    return (
      <div className="col-span-12 rounded-md bg-white px-5 pt-8 pb-5 shadow-md dark:bg-gray-800 sm:px-8 xl:col-span-8">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          Mobile App Tasks
        </h4>
        <div className="section p-4 mb-4">
          <ul className="list-inside list-none">
            <li key={1} className="mb-5">
              <label className="flex items-center mb-5">
                <span className={`${"line-through text-gray-500"}`}>
                  Group are not assigned to a project yet.
                </span>
              </label>
            </li>
          </ul>
        </div>
      </div>
    );
  }

  const mobileTasks = await prisma.task.findMany({
    where: {
      type: "Mobile Application",
      projectId: groupProjectId,
    },
  });

    const webTasks = await prisma.task.findMany({
      where: {
        type: "Web Application",
        projectId: groupProjectId,
      },
    });

    const numberOfSprints = 12;

    const webTasksArry = new Array(numberOfSprints).fill(0);
    const mobileTasksArry = new Array(numberOfSprints).fill(0);

    webTasks
      .filter((task: any) => task.status === true)
      .forEach((task: any) => {
        const sprintIndex = parseInt(task.sprint) - 1; // Assuming sprint numbers start from 1
        webTasksArry[sprintIndex]++;
      });

    mobileTasks
      .filter((task: any) => task.status === true)
      .forEach((task: any) => {
        const sprintIndex = parseInt(task.sprint) - 1; // Assuming sprint numbers start from 1
        mobileTasksArry[sprintIndex]++;
      });

  return (
    <>
      <div className="col-span-12 rounded-md bg-white p-5 shadow-md  dark:bg-gray-800 sm:p-8 xl:col-span-8">
        <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
          <div className="flex w-full flex-wrap gap-3 sm:gap-5">
            <div className="flex items-center">
              <span className="h-4 w-4 rounded-full bg-blue-600"></span>
              <div className="ml-2">
                <p className="font-semibold text-gray-500 dark:text-gray-300">
                  Web App
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <span className="h-4 w-4 rounded-full bg-sky-400"></span>
              <div className="ml-2">
                <p className="font-semibold text-gray-500 dark:text-gray-300">
                  Mobile App
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div id="chartOne">
            <LineChart mobileTasks={mobileTasksArry} webTasks={webTasksArry} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChartOne;
