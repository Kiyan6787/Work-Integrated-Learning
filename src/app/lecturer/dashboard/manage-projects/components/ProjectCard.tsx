import Link from "next/link";
import DeleteProjectModel from "./Delete/DeleteModel";
import Image from "next/image";
import UpdateProjectModel from "./UpdateStatus/UpdateModel";
import prisma from "@/lib/prisma/prismadb";

interface Project {
  id: string;
  ownerId: string;
  organization: string;
  projectTitle: string;
  projectBrief: string;
  projectRequirements: string;
  assignedTo: string;
  isApproved: string;
  createdAt: Date;
  updatedAt: Date;
  files: string[];
  tasks: string[];
}

interface FileCardProps {
  projects: Project[];
}

const ProjectCard: React.FC<FileCardProps> = ({ projects }) => {
  return (
    <>
      {projects.map( async (project) => {

          const projectOwner = await prisma.user
            .findUnique({
              where: {
                id: project?.ownerId,
              },
            })
            .finally(() => prisma.$disconnect());


        return (
          <div
            key={project.id}
            className="py-6 px-8 shadow-md hover:shadow-lg dark:bg-gray-800 rounded-lg"
          >
            <div className="flex items-center">
              <div className="flex flex-col md:flex-row items-center mb-5 text-center md:text-left">
                <div>
                  <span className="h-18 w-18 rounded-full">
                    <Image
                      src={projectOwner?.image as string}
                      width={70}
                      height={70}
                      alt="User"
                      className="rounded-full"
                    />
                  </span>
                </div>
                <span className="block ml-4">
                  <span className="block text-md font-bold text-black dark:text-white">
                    {projectOwner?.email}
                  </span>
                  <span className="block text-sm text-gray-300">
                    {projectOwner?.name}
                  </span>
                </span>
              </div>
            </div>

            <div className="mt-0 flex items-end justify-between">
              <div className="flex flex-col w-full">
                <div className="flex flex-col md:flex-row justify-between md:w-full">
                  <h4 className="text-title-md mb-4 font-bold text-black dark:text-white">
                    Project: {project.projectTitle}
                  </h4>
                  <span>
                    {project.isApproved == "approved" ? (
                      <span className="block px-2  py-1 mb-2 text-white shadow-lg hover:shadow-xl bg-green-500 font-medium rounded-lg text-sm text-center">
                        Approved
                      </span>
                    ) : project.isApproved == "rejected" ? (
                      <span className="block px-2 py-1 mb-2 text-white shadow-lg hover:shadow-xl bg-danger font-medium rounded-lg text-sm text-center">
                        Rejected
                      </span>
                    ) : (
                      <span className="block px-2 py-1 mb-2 text-white shadow-lg hover:shadow-xl bg-danger font-medium rounded-lg text-sm text-center">
                        Pending Review
                      </span>
                    )}
                  </span>
                </div>

                <div className="mb-2">
                  <h3 className="font-bold">Project brief</h3>
                  <span className="text-md font-medium ">
                    {project.projectBrief}
                  </span>
                </div>
                <div className="mb-3">
                  <h3 className="font-bold">Project requirements</h3>
                  <span className="text-md font-medium ">
                    {project.projectRequirements}
                  </span>
                </div>
                {/* <span className="text-sm font-medium">{project.createdAt.toString()}</span> */}
                <div className="flex flex-row justify-start md:justify-end gap-3 mt-5">
                  <UpdateProjectModel
                    projectId={project.id}
                    isApproved={project.isApproved}
                  />
                  {project.assignedTo === "" ? (
                    <DeleteProjectModel projectId={project.id} />
                  ) : (
                    <Link
                      href={{
                        pathname: "/lecturer/dashboard/groups/group-members",
                        query: { id: project.assignedTo },
                      }}
                      className="inline-flex bg-primary items-center justify-center align-middle px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-meta-5 focus:ring-4 focus:outline-none"
                    >
                      Assigned Group
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
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ProjectCard;
