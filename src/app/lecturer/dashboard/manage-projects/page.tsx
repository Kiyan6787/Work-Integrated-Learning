import ProjectCard from "./components/ProjectCard";
import prisma from "@/lib/prisma/prismadb";

export default async function page() {
  const projects: any = await prisma.projects
    .findMany()
    .finally(() => prisma.$disconnect());

    

  return (
    <div className="grid grid-cols-1 gap-5 2xl:gap-7.5">
      <ProjectCard projects={projects} />
    </div>
  );
}
