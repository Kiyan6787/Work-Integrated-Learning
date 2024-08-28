"use client";
import { updateTask, deleteTask } from "../../../../../actions/Actions";
import FormButton from "./FormButton";
import React, { useState, useRef } from "react";
import DeleteButton from "./DeleteButton";
import toast from "react-hot-toast";

export default function TaskModel({ task }: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState(task.taskTitle);
  const [taskDescription, setTaskDescription] = useState(task.taskDescription);
  const [taskStatus, setTaskStatus] = useState(task.status);
  const [sprint, setSprint] = useState(task.sprint);
  const [toUpdate, setToUpdate] = useState(false);
  const ref = useRef<HTMLFormElement>(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setToUpdate(false);
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
                Task : {taskTitle}
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

            {toUpdate ? (
              <form
                ref={ref}
                action={async (formDta: any) => {
                  const result = await updateTask(formDta, task.id).then(
                    (result) => {
                      if (result === null) {
                        throw new Error("Task is null");
                      }
                      ref.current?.reset();
                      setToUpdate(false);
                      setIsModalOpen(false);
                      return result;
                    }
                  );
                  if (result?.error) {
                    toast.error(result?.error as string);
                  } else {
                    toast.success("Task Updated");
                  }
                }}
                className="p-4 md:p-5"
              >
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Task
                    </label>
                    <input
                      type="text"
                      name="task"
                      id="task"
                      value={taskTitle}
                      onChange={(e) => setTaskTitle(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Type task name"
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    <label
                      htmlFor="sprint"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Sprint
                    </label>
                    <select
                      name="sprint"
                      id="sprint"
                      value={sprint}
                      onChange={(e) => setSprint(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      required
                    >
                      <option value={1}>Week 1</option>
                      <option value={2}>Week 2</option>
                      <option value={3}>Week 3</option>
                      <option value={4}>Week 4</option>
                      <option value={5}>Week 5</option>
                      <option value={6}>Week 6</option>
                      <option value={7}>Week 7</option>
                      <option value={8}>Week 8</option>
                      <option value={9}>Week 9</option>
                      <option value={10}>Week 10</option>
                      <option value={11}>Week 11</option>
                      <option value={12}>Week 12</option>
                      <option value={13}>Week 13</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label
                      htmlFor="description"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows={4}
                      value={taskDescription}
                      onChange={(e) => setTaskDescription(e.target.value)}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Write task description here"
                    ></textarea>
                  </div>
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Complete:
                  </label>
                  <input
                    type="checkbox"
                    name="status"
                    className="mr-2 form-checkbox h-5 w-5 text-indigo-600"
                    checked={taskStatus}
                    onChange={(e) => setTaskStatus(e.target.checked)}
                  />
                </div>
                <div className="flex justify-between">
                  <FormButton />
                  <button
                    onClick={() => setToUpdate(false)}
                    className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none   font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700  "
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
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
                <div className="flex justify-between">
                  <button
                    onClick={() => setToUpdate(true)}
                    className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none   font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700  "
                  >
                    Edit
                  </button>
                  <form
                    action={async () => {
                      const result = await deleteTask(task.id).then(
                        (result) => {
                          if (result === null) {
                            throw new Error("Task is null");
                          }
                          ref.current?.reset();
                          setIsModalOpen(false);
                          return result;
                        }
                      );
                      if (result?.error) {
                        toast.error(result?.error as string);
                      } else {
                        toast.success("Task Deleted");
                      }
                    }}
                  >
                    <DeleteButton />
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
