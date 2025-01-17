import React from "react";
import prisma from "@/lib/prisma/prismadb";
import Link from "next/link";

type Project = {
  id: string;
  organization: string | null;
  projectTitle: string | null;
  projectBrief: string | null;
}[];

export default async function ProjectCard() {
  const projects: Project = await prisma.projects.findMany({
    where: {
      isApproved: "approved",
    },
    select: {
      id: true,
      organization: true,
      projectTitle: true,
      projectBrief: true,
    },
  });

  return (
    <>
      {projects.map((project: any) => {
        return (
          <div
            key={project.id}
            className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <a href="#">
              <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                {project.organization}: {project.projectTitle}
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {project.projectBrief}
            </p>
            <Link
              href={{
                pathname: "/student/dashboard/project/project-details",
                query: { id: project.id },
              }}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none   dark:bg-blue-600 dark:hover:bg-blue-700  "
            >
              Read more
              <svg
                className="w-3.5 h-3.5 ml-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </Link>
          </div>
        );
      })}
    </>
  );
}
