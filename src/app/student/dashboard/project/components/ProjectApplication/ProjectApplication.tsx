import prisma from "@/lib/prisma/prismadb";
import React from "react";
import AddTask from "./AddTask";
import TaskModel from "./TaskModel";

export default async function ProjectApplication({ projectId, groupId }: { projectId: string, groupId: string}) {
  const taskType = [
    {
      id: 1,
      name: "Web Application",
      tasks: await prisma.task
        .findMany({
          where: {
            projectId: await projectId,
            type: "Web Application",
          },
        })
        .finally(() => async () => {
          await prisma.$disconnect();
        }),
    },
    {
      id: 2,
      name: "Mobile Application",
      tasks: await prisma.task
        .findMany({
          where: {
            projectId: await projectId,
            type: "Mobile Application",
          },
        })
        .finally(() => async () => {
          await prisma.$disconnect();
        }),
    },
  ];

  return (
    <>
      {taskType.map((type) => {
        return (
          <div
            key={type.id}
            className="py-5 px-5 shadow-lg hover:shadow-xl transition duration-300 ease-in-out  dark:bg-gray-800 rounded-lg"
          >
            <div className="flex justify-between">
              <div className="inline-block my-auto align-middle text-lg font-semibold text-gray-700 dark:text-gray-200">
                {type.name}
              </div>
              <div className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                <AddTask
                  type={type.name}
                  projectId={projectId}
                  groupId={groupId}
                />
              </div>
            </div>
            <div className="mt-5">
              {type.tasks.map((task: any) => {
                return (
                  <TaskModel
                    key={task.id}
                    task={task}
                    projectId={projectId}
                    groupId={groupId}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
}
