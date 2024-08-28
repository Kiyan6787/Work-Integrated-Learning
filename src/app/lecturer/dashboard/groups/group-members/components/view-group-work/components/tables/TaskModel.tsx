"use client";

import React, { useState } from "react";


export default function TaskModel({ task }: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);

  };

  return (
    <>
      {/* <!-- Modal toggle --> */}
      <div
        onClick={openModal}
        // type="button"
        key={task.id}
        className="flex justify-between p-2 mb-2 bg-white hover:bg-gray-50 shadow-md hover:shadow-lg rounded-lg dark:bg-gray-700 hover:dark:bg-gray-700 cursor-pointer transition-all ease-in-out"
      >
        <label className="flex items-center">
          <input
            type="checkbox"
            className="mr-2 form-checkbox h-5 w-5 text-indigo-600"
            checked={task.status}
          />
          <span
            className={`${task.status ? "line-through text-gray-500" : ""}`}
          >
            {task.taskTitle} - {task.status ? "Completed" : "Pending"}
          </span>
        </label>
      </div>

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
                Task : {task.taskTitle}
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

            <div className="p-4 md:p-5">
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Sprint:
                  </label>
                  week {task.sprint}
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Description:
                  </label>
                  {task.taskDescription}
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Complete:
                  </label>
                  {task.status ? "Yes" : "No"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
