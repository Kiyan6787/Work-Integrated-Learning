import prisma from "@/lib/prisma/prismadb";
import { NextResponse } from "next/server";

//get all projects
export async function GET(req) {
  const url = new URL(req.url);
  try {
    const projects = await prisma.projects
      .findMany({
        where: {
          ownerId: url.searchParams.get("id"),
        },
      })
      .finally(() => prisma.$disconnect());
    return Response.json(projects);
  } catch (error) {
    throw new Error(error);
  }
}

//create project
export async function POST(req) {
  const data = await req.json();
  try {
    const projects = await prisma.projects
      .create({
        data: {
          organization: data.organization,
          projectTitle: data.project_title,
          projectBrief: data.project_brief,
          projectRequirements: data.project_requirements,
          files: [],
          ownerId: data.ownerId,
        },
      })
      .finally(() => prisma.$disconnect());
    return NextResponse.json(projects);
  } catch (error) {
    throw new Error(error);
  }
}

//delete project
export async function DELETE(req) {
  const url = new URL(req.url);
  try {
    const projects = await prisma.projects
      .delete({
        where: {
          id: url.searchParams.get("id"),
        },
      })
      .finally(() => prisma.$disconnect());
    return NextResponse.json(projects);
  } catch (error) {
    throw new Error(error);
  }
}
