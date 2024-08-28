import React from "react";
import ProjectCard from "./ProjectCard";

export default function Page() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 xl:grid-cols-3 2xl:gap-5 m-auto">
      <ProjectCard />
    </div>
  );
}
