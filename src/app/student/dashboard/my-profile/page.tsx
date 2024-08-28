import React, { useState } from "react";
import CoverOne from "public/images/cover/cover-01.png";
import Image from "next/image";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SettingsModal from '@/app/components/sidebar/SettingsModal';
import { User } from '@prisma/client';


async function Page({ currentUser }: { currentUser: User }) {
  const session: any = await getServerSession(authOptions);

  if (session) {
    return (
      <>
        <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default  dark:bg-gray-800">
          <div className="relative z-20 h-35 md:h-64">
            <Image
              src={CoverOne}
              alt="profile cover"
              className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
            />
          </div>
          <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-12">
            <div className="relative z-30 mx-auto -mt-20 h-32 w-44 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-4">
              <div className="relative">
                <Image
                  src={session.user.image}
                  width={150}
                  height={150}
                  alt="profile"
                  className="rounded-full"
                />
                <label
                  htmlFor="profile"
                  className="absolute bottom-0 right-0 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-8 h-8 bg-blue-700 hover:bg-blue-600 rounded-full p-1"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
                    />
                  </svg>
                  <input
                    type="file"
                    name="profile"
                    id="profile"
                    className="sr-only"
                  />
                </label>
              </div>
            </div>
            <div className="mt-5 md:mt-2">
              <h3 className="mb-2 text-2xl font-semibold text-black dark:text-white">
                Varsity College Student
              </h3>
              <p className="font-medium">
                {session.user.name} - {session.user.email}
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default Page;
