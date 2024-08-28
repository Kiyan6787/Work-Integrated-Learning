"use client";

import toast from "react-hot-toast";
import React, { useState, useRef } from "react";
import DeleteMemberButton from "./DeleteMemberButton";
import { RemoveMemberFromGroup } from "../../../../../../actions/Actions";

export default function AddMemberModel({
  groupMembers,
  groupId,
}: {
  groupMembers: any;
  groupId: string;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const ref = useRef<HTMLFormElement>(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* <!-- Modal toggle --> */}
      <button
        onClick={openModal}
        className="w-44 inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200"
        type="button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 mr-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
          />
        </svg>
        Remove Student
      </button>

      {/* <!-- Main modal --> */}
      <div
        id="crud-modal"
        tabIndex={-1}
        aria-hidden="true"
        className={`${
          isModalOpen ? "fixed flex justify-center items-center" : "hidden"
        } inset-0 w-full h-full bg-black bg-opacity-50 z-50 transition-opacity duration-500 ease-in-out`}
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          {/* <!-- Modal content --> */}
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* <!-- Modal header --> */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Remove Student From Group
              </h3>
              <button
                onClick={closeModal}
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
            {/* <!-- Modal body --> */}
            <form
              className="p-4 md:p-5"
              action={async (formDta: FormData) => {
                const result = await RemoveMemberFromGroup(
                  formDta,
                  groupId
                ).then((result) => {
                  if (result === null) {
                    throw new Error("Student is null");
                  }
                  closeModal();
                  return result;
                });
                if (result?.error) {
                  toast.error(result?.error as string);
                } else {
                  toast.success("Student Removed");
                }
              }}
            >
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label
                    htmlFor="sprint"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Students in group
                  </label>
                  <select
                    name="studentId"
                    id="studentId"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    required
                  >
                    {groupMembers.map((student: any) => {
                      return (
                        <option key={student.id} value={student.id}>
                          {student.email} - {student.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <DeleteMemberButton />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
