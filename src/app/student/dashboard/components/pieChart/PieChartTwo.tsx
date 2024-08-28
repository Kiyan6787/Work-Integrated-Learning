import prisma from "@/lib/prisma/prismadb";
import PieChart from "./PieChart";

export default async function PieChartOne({
  GroupId,
}: {
  GroupId: string | null;
}) {
  if (GroupId === null || GroupId === undefined || GroupId === "") {
    return (
      <div className="col-span-12 rounded-md bg-white px-5 pt-8 pb-5 shadow-md dark:bg-gray-800 sm:px-8 xl:col-span-8">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          Mobile App Tasks
        </h4>
        <div className="section p-4 mb-4">
          <ul className="list-inside list-none">
            <li key={1} className="mb-5">
              <label className="flex items-center mb-5">
                You are not assigned to a group yet.
              </label>
            </li>
          </ul>
        </div>
      </div>
    );
  }

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

  if (groupProjectId === null || groupProjectId === undefined || groupProjectId === "") {
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
                  You are not assigned to a project yet.
                </span>
              </label>
            </li>
          </ul>
        </div>
      </div>
    );
  }

  const Tasks = await prisma.task.findMany({
    where: {
      type: "Mobile Application",
      projectId: groupProjectId,
    },
  });

  if (Tasks.length === 0 || Tasks === null || Tasks === undefined) {
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
                  There are no tasks for this project yet.
                </span>
              </label>
            </li>
          </ul>
        </div>
      </div>
    );
  }

  const totalTasks: number = Tasks.length;
  const completedTasks: number = Tasks.filter(
    (task) => task.status === true
  ).length;
  const incompleteTasks: number = Tasks.filter(
    (task) => task.status === false
  ).length;

  const percentageComplete: number = (completedTasks / totalTasks) * 100;
  const percentageIncomplete: number = (incompleteTasks / totalTasks) * 100;

  return (
    <>
      <div className="col-span-12 rounded-md bg-white p-8 shadow-md dark:bg-gray-800 xl:col-span-4">
        <div className="mb-3 justify-between gap-4 sm:flex">
          <div>
            <h5 className="text-xl font-semibold text-black dark:text-white">
              Mobile App Progress
            </h5>
          </div>
        </div>
        <div className="mb-2">
          <div id="chartThree" className="mx-auto flex justify-center">
            <PieChart
              complete={percentageComplete}
              incomplete={percentageIncomplete}
            />
          </div>
        </div>

        <div className="-mx-8 flex flex-wrap items-center justify-between gap-y-3">
          <div className="w-full px-8 sm:w-1/2">
            <div className="flex w-full items-center">
              <p className="flex w-full text-sm font-medium text-black dark:text-white">
                <span className="pr-1"> Complete: </span>
                <span> {percentageComplete.toFixed(2)}%</span>
              </p>
            </div>
          </div>
          <div className="w-full px-8 sm:w-1/2">
            <div className="flex w-full items-center">
              <p className="flex w-full text-sm font-medium text-black dark:text-white">
                <span className="pr-1"> Incomplete: </span>
                <span> {percentageIncomplete.toFixed(2)}%</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
