import React from "react";
import AddMemberModel from "../add-member/AddMemberModel";
import ViewProjectModel from "../view-project/ViewProjectModel";
import AssignProjectModel from "../assign-project/AssignProjectModel";
import MessageGroupModel from "../message-group/MessageGroupModel";
import DeleteMemberModel from "../delete-member/DeleteMemberModel";
import DeleteGroupModel from "../delete-group/DeleteGroupModel";
import prisma from "@/lib/prisma/prismadb";

export default async function TopRibbon({
  groupId,
  groupMembers,
  projectId,
}: {
  groupId: any;
  groupMembers: any;
  projectId:any;
}) {

  const studentWithNoGroup = await prisma.user.findMany({
    where: {
      role: "student",
      groupId: "",
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  const projectsWithNoGroup = await prisma.projects.findMany({
    select: {
      id: true,
      projectTitle: true,
      organization: true,
    },
    where: {
      isApproved: "approved",
      assignedTo: "",
    },
  });
  
  const project =  await prisma.projects.findUnique({
    where: {
      id: projectId,
    }
  }) 

  return (
    <>
      <div className="m-auto flex flex-col lg:flex-row gap-5 items-center justify-center rounded-md shadow-sm">
        <AddMemberModel
          studentWithNoGroup={studentWithNoGroup}
          groupId={groupId}
        />
        {project ? (
          <ViewProjectModel project={project} groupId={groupId} />
        ) : (
          <AssignProjectModel
            projectsWithNoGroup={projectsWithNoGroup}
            groupId={groupId}
          />
        )}
        <MessageGroupModel groupMembers={groupMembers} groupId={groupId} />
        <DeleteMemberModel groupMembers={groupMembers} groupId={groupId} />
        <DeleteGroupModel groupMembers={groupMembers} groupId={groupId} />
      </div>
    </>
  );
}
