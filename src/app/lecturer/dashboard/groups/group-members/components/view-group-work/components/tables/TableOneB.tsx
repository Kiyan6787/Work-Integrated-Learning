import prisma from "@/lib/prisma/prismadb";
import TaskModel from "./TaskModel";

const TableOne = async ({ GroupId }: { GroupId: string}) => {
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
                  Group are not assigned to a project yet.
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

  if (Tasks.length === 0) {
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

  return (
    <div className="col-span-12 rounded-md bg-white px-2 pt-5 pb-5 shadow-md dark:bg-gray-800 sm:px-8 xl:col-span-8">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Mobile App Tasks
      </h4>

      <div className="section p-2 mb-4">
        <ul className="list-inside list-none">
          {Tasks.map((task) => (
            <TaskModel key={task.id} task={task} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TableOne;
