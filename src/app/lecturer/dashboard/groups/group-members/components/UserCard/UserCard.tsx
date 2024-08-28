import prisma from "@/lib/prisma/prismadb";
import React from "react";
import Image from "next/image";
import User from "../../../../../../../../public/images/user-type-icons/student.png";
import { UserData } from "@/lib/types/types";
import Link from "next/link";

export default async function UserCard({ group }: { group: UserData[] }) {
  return (
    <>
      {group.map((member: UserData) => {
        return (
          <div
            key={member.id}
            className="bg-white dark:bg-gray-800 rounded-md  dark:border-gray-700 p-6 shadow-md"
          >
            <div className="flex flex-col items-center pb-10 px-4 pt-4">
              <Image
                className="w-24 h-24 mb-3 rounded-full shadow-lg"
                src={member.image ? member.image : User}
                width={100}
                height={100}
                alt="Bonnie image"
              />
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                {member.name}
              </h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {member.email}
              </span>
              <div className="flex mt-4 space-x-3 md:mt-6">
                <Link
                  href={{
                    pathname: "/student/dashboard/my-group/view-profile",
                    query: { id: member.id },
                  }}
                  className="inline-flex bg-primary items-center justify-center align-middle px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-meta-5 focus:ring-4 focus:outline-none"
                >
                  View Profile
                </Link>
                <a
                  href="#"
                  className="inline-flex bg-primary items-center justify-center align-middle px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-meta-5 focus:ring-4 focus:outline-none"
                >
                  Message
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
