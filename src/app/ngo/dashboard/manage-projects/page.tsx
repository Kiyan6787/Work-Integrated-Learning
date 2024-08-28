import ProjectCard from "./ProjectCard";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma/prismadb";

export default async function page() {
  const session: any = await getServerSession(authOptions);

  const projects: any = await prisma.projects
    .findMany({
      where: {
        ownerId: await session.user.id,
      },
    })
    .finally(() => prisma.$disconnect());

  return (
    <div className="grid grid-cols-1 gap-5 2xl:gap-7.5">
      <ProjectCard projects={projects} />
    </div>
  );
}
