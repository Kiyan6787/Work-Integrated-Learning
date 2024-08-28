import CoverOne from "public/images/cover/cover-01.png";
import Image from "next/image";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma/prismadb";

async function Page() {
  const session: any = await getServerSession(authOptions);
  
  const userData: any = await prisma.user.findUnique({
    where: {
      id: session.user.id
    }
  })
  
  return (
    <>
      <div className="overflow-hidden rounded-lg shadow-default  dark:bg-gray-800">
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
                src={await userData.image}
                width={150}
                height={150}
                alt="profile"
                className="rounded-full"
              />
              
            </div>
          </div>
          <div className="mt-2">
            <h3 className="mb-2 text-2xl font-semibold text-black dark:text-white">
              NGO
            </h3>
            <p className="font-medium">
              {userData.name} - {userData.email}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
