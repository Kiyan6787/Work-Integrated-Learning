import prisma from "@/lib/prisma/prismadb";

import Cards from "./cards/Cards";
import ChartOne from "./charts/ChartOne";
import ChartTwo from "./charts/ChartTwo";
import PieChartTwo from "./pieChart/PieChartTwo";
import PieChartOne from "./pieChart/PieChartOne";
import TableOne from "./tables/TableOne";
import TableOneB from "./tables/TableOneB";

const Cluster = async ({ groupId }: { groupId: string }) => {
  return (
    <>
      <Cards GroupId={groupId} />
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne GroupId={groupId} />
        <ChartTwo GroupId={groupId} />
        <TableOne GroupId={groupId} />
        <PieChartOne GroupId={groupId} />
        <TableOneB GroupId={groupId} />
        <PieChartTwo GroupId={groupId} />
      </div>
    </>
  );
};

export default Cluster;
