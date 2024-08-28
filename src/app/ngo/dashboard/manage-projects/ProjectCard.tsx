import Link from "next/link";
import DeleteProjectModel from "./components/Delete/DeleteModel";
import prisma from "@/lib/prisma/prismadb";
import { result } from "lodash";

interface Project {
  id: string;
  ownerId: string;
  organization: string;
  projectTitle: string;
  projectBrief: string;
  projectRequirements: string;
  isApproved: string;
  assignedTo: string;
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
      {projects.map(async (project) => {
        return (
          <div
            key={project.id}
            className="py-6 px-8 shadow-default  dark:bg-gray-800 rounded-lg"
          >
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
                <div className="flex flex-row justify-start md:justify-end gap-3 mt-5">
                  {project.assignedTo != "" ? (
                    <Link
                      href="#0"
                      className="text-white inline-flex items-center bg-blue-700   font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-danger dark:hover:bg-danger_hover  "
                    >
                      Contact Assigned Team
                    </Link>
                  ) : (
                    <DeleteProjectModel projectId={project.id} />
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
