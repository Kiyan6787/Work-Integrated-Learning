import React from "react";
import AddGroup from "./components/add-group/AddGroup";
import GroupCard from "./GroupCard";

export default function page() {
  return (
    <>
      <div className="flex py-5 justify-end">
        <AddGroup />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5 m-auto">
        <GroupCard />
      </div>
    </>
  );
}
