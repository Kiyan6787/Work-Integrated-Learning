import prisma from "@/lib/prisma/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import {UserSession } from "@/lib/types/types"

import Cards from "./cards/Cards";
import ChartOne from "./charts/ChartOne";
import ChartTwo from "./charts/ChartTwo";
import PieChartTwo from "./pieChart/PieChartTwo";
import PieChartOne from "./pieChart/PieChartOne";
import TableOne from "./tables/TableOne";
import TableOneB from "./tables/TableOneB";

const Cluster = async () => {
  const session: UserSession | null = await getServerSession(authOptions);

  //get student group id from prisma student
  const studentGroup: string | null = await prisma.user
    .findUnique({
      where: {
        id: await session?.user.id,
      },
      select: {
        groupId: true,
      },
    })
    .then((result) => {
      if (result === null || result.groupId === null) {
        // throw new Error("User group is null");
        return null;
      }
      return result.groupId;
    })
    .finally(() => prisma.$disconnect());

  return (
    <>
      <Cards GroupId={studentGroup} />
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne GroupId={studentGroup} />
        <ChartTwo GroupId={studentGroup} />
        <TableOne GroupId={studentGroup} />
        <PieChartOne GroupId={studentGroup} />
        <TableOneB GroupId={studentGroup} />
        <PieChartTwo GroupId={studentGroup} />
      </div>
    </>
  );
};

export default Cluster;
