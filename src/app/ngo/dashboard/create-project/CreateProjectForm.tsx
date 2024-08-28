"use client"

import React from 'react'
import CreateProjectButton from './CreateProjectButton'
import toast from "react-hot-toast";
import {useRouter} from 'next/navigation'
import { useSession } from "next-auth/react";
import { createProject } from '../../../actions/Actions';

export default function CreateProjectForm() {
  const { data: session, status }: any = useSession();
  const router = useRouter();
  return (
    <>
      <form
        action={async (formData: FormData) => {
          const result = await createProject(formData, session.user.id).then(
            (result) => {
              if (result === null) {
                throw new Error("Project is null");
              }
              return result;
            }
          );
          if (result?.error) {
            toast.error(result?.error as string);
          } else {
            router.push("/ngo/dashboard/manage-projects");
            toast.success("Project has been Added");
          }
        }}
      >
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Organization Name
          </label>
          <input
            type="text"
            name="organization_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Project Title
          </label>
          <input
            type="text"
            name="project_title"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Project Brief
          </label>
          <textarea
            name="project_brief"
            rows={6}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Leave a brief..."
          ></textarea>
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Project Requirements
          </label>
          <textarea
            name="project_requirements"
            rows={6}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Leave requirements..."
          ></textarea>
        </div>
        <CreateProjectButton />
      </form>
    </>
  );
}
