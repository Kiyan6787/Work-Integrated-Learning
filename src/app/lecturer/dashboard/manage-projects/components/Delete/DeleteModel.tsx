"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { deleteProject } from "@/app/actions/Actions";
import DeleteButton from "./DeleteButton";

export default function CardButton({ projectId }: { projectId: string }) {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="block text-white shadow-lg hover:shadow-xl bg-danger hover:bg-danger_hover focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center transition duration-300 ease-in-out"
        type="button"
      >
        Delete
      </button>

      {isModalOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-800">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Delete Project
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="bg-white rounded-lg p-6 w-180 dark:bg-gray-800">
              <h3 className="text-lg font-semibold mb-4">
                Are you sure you want to Delete this project?
              </h3>
              <div className="flex justify-center">
                <form
                  action={async () => {
                    const result = await deleteProject(projectId).then(
                      (result) => {
                        if (result === null) {
                          throw new Error("Project is null");
                        }
                        setModalOpen(false);
                        return result;
                      }
                    );
                    if (result?.error) {
                      toast.error(result?.error as string);
                    } else {
                      toast.success("Project Deleted");
                    }
                  }}
                >
                  <DeleteButton />
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
