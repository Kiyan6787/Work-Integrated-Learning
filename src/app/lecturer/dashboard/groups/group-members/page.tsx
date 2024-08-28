import React from "react";
import prisma from "@/lib/prisma/prismadb";
import UserCard from "./components/UserCard/UserCard";
import TopRibbon from "./components/TopRibbon/TopRibbon";
import Cluster from "./components/view-group-work/components/Cluster";

type Params = {
  id: string;
};

export default async function Page({ searchParams }: { searchParams: Params }) {
  const groupMembers: any = await prisma.groups
    .findUnique({
      where: {
        id: await searchParams.id,
      },
      select: {
        projectId: true,
        members: true,
      },
    })
    .finally(() => prisma.$disconnect());

  return (
    <>
      <div className="my-5">
        <TopRibbon
          groupId={await searchParams.id}
          groupMembers={await groupMembers.members}
          projectId={await groupMembers.projectId}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-8">
        <UserCard group={await groupMembers.members} />
      </div>
      <div className="my-5">
        <Cluster groupId={await searchParams.id} />
      </div>
    </>
  );
}
