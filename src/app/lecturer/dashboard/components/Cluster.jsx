import Cards from "./cards/Cards";
import TableOne from "./tables/TableOne";

const Cluster = () => {
  return (
    <>
      <Cards />
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <TableOne />
      </div>
    </>
  );
};

export default Cluster;
