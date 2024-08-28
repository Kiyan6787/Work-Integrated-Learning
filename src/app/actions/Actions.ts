"use server";

import prisma from "@/lib/prisma/prismadb";
import { revalidatePath } from "next/cache";

export const addTask = async (
  formData: FormData,
  projectId: string,
  type: string,
  groupId: string
) => {
  try {
    await prisma.task
      .create({
        data: {
          projectId: projectId,
          groupId: groupId,
          type: type,
          taskTitle: formData.get("task") as string,
          taskDescription: formData.get("description") as string,
          sprint: formData.get("sprint") as string,
        },
      })
      .finally(() => prisma.$disconnect());
    revalidatePath(`/student/dashboard/project`);
  } catch (error) {
    return {
      error: "Something went wrong, try again",
    };
  }
};

export async function updateTask(formData: FormData, taskId: string) {
  try {
    await prisma.task
      .update({
        where: {
          id: taskId,
        },
        data: {
          taskTitle: formData.get("task") as string,
          taskDescription: formData.get("description") as string,
          status: (formData.get("status") as string) == "on" ? true : false,
          sprint: formData.get("sprint") as string,
        },
      })
      .finally(() => prisma.$disconnect());
    revalidatePath(`/student/dashboard/project`);
  } catch (error) {
    return {
      error: "Something went wrong, try again",
    };
  }
}

export async function deleteTask(taskId: string) {
  try {
    await prisma.task
      .delete({
        where: {
          id: taskId,
        },
      })
      .finally(() => prisma.$disconnect());
    revalidatePath(`/student/dashboard/project`);
  } catch (error) {
    return {
      error: "Something went wrong, try again",
    };
  }
}

export async function deleteProject(projectId: string) {
  try {
    await prisma.projects
      .delete({
        where: {
          id: projectId,
        },
      })
      .finally(() => prisma.$disconnect());
    revalidatePath(`/lecturer/dashboard/manage-projects`);
  } catch (error) {
    return {
      error: "Something went wrong, try again",
    };
  }
}

export async function updateProject(formData: FormData, projectId: string) {
  try {
    await prisma.projects
      .update({
        where: {
          id: projectId,
        },
        data: {
          isApproved: formData.get("isApproved") as string,
        },
      })
      .finally(() => prisma.$disconnect());
    revalidatePath(`/`);
  } catch (error) {
    return {
      error: "Something went wrong, try again",
    };
  }
}

export async function addGroup(lecturerId: string, groupCount: number) {
  try {
    await prisma.groups
      .create({
        data: {
          lecturerId: lecturerId,
          projectId: "",
          groupNumber: `${groupCount}`,
        },
      })
      .finally(() => prisma.$disconnect());
    revalidatePath("/lecturer/dashboard/groups");
  } catch (error) {
    return {
      error: "Something went wrong, try again",
    };
  }
}

export async function AddMemberToGroup(formData: FormData, GroupId: string) {
  try {
    await prisma.user
      .update({
        where: {
          id: formData.get("studentId") as string,
        },
        data: {
          groupId: GroupId,
        },
      })
      .finally(() => prisma.$disconnect());
    revalidatePath(`/lecturer/dashboard/groups/group-members?id=${GroupId}`);
  } catch (error) {
    return {
      error: "Something went wrong, try again",
    };
  }
}

export async function RemoveMemberFromGroup(
  formData: FormData,
  GroupId: string
) {
  try {
    await prisma.user
      .update({
        where: {
          id: formData.get("studentId") as string,
        },
        data: {
          groupId: "",
        },
      })
      .finally(() => prisma.$disconnect());
    revalidatePath(`/lecturer/dashboard/groups/group-members?id=${GroupId}`);
  } catch (error) {
    return {
      error: "Something went wrong, try again",
    };
  }
}

export async function deleteGroup(GroupId: string) {
  try {
    await prisma.groups
      .delete({
        where: {
          id: GroupId,
        },
      })
      .finally(() => prisma.$disconnect());
    revalidatePath(`/`);
  } catch (error) {
    return {
      error: "Something went wrong, try again",
    };
  }
}

export async function AssignProjectToGroup(formData: FormData, GroupId: string) {
  try {
    await prisma.projects
      .update({
        where: {
          id: formData.get("projectId") as string,
        },
        data: {
          assignedTo: GroupId,
        },
      })
      .finally(() => prisma.$disconnect());

      await prisma.groups
        .update({
          where: {
            id: GroupId,
          },
          data: {
            projectId: formData.get("projectId") as string,
          },
        })
        .finally(() => prisma.$disconnect());

    revalidatePath(`/lecturer/dashboard/groups/group-members?id=${GroupId}`);
  } catch (error) {
    return {
      error: "Something went wrong, try again",
    };
  }
}

export async function UnassignProjectFromGroup(
  projectId: string,
  GroupId: string
) {
  try {
    await prisma.projects
      .update({
        where: {
          id: projectId,
        },
        data: {
          assignedTo: "",
        },
      })
      .finally(() => prisma.$disconnect());

    await prisma.groups
      .update({
        where: {
          id: GroupId,
        },
        data: {
          projectId: "",
        },
      })
      .finally(() => prisma.$disconnect());

    revalidatePath(`/lecturer/dashboard/groups/group-members?id=${GroupId}`);
  } catch (error) {
    return {
      error: "Something went wrong, try again",
    };
  }
}


export const createProject = async (
  formData: FormData,
  ownerId: string
) => {
  try {
    await prisma.projects
      .create({
        data: {
          organization: formData.get("organization_nam") as string,
          projectTitle: formData.get("project_title") as string,
          projectBrief: formData.get("project_brief") as string,
          projectRequirements: formData.get("project_requirements") as string,
          files: [],
          ownerId: ownerId,
        },
      })
      .finally(() => prisma.$disconnect());
    revalidatePath(`/ngo/dashboard/project`);
  } catch (error) {
    return {
      error: "Something went wrong, try again",
    };
  }
};

export async function StudentJoinGroup(studentId: string, GroupId: string) {
  try {
    await prisma.user
      .update({
        where: {
          id: studentId,
        },
        data: {
          groupId: GroupId,
        },
      })
      .finally(() => prisma.$disconnect());
    revalidatePath(`/student/dashboard/groups`);
  } catch (error) {
    return {
      error: "Something went wrong, try again",
    };
  }
}

export async function updateUserProfile(
  formData: FormData,
  userId: string,
  role: string,
  image: string
) {
  try {
    await prisma.user
      .update({
        where: {
          id: userId,
          role: role,
          image : image
        },
        data: {
          name: formData.get("name") as string,
          email: formData.get("email") as string,
          image: image,
        },
      })
      .finally(() => prisma.$disconnect());
  } catch (error) {
    return {
      error: "Something went wrong, try again",
    };
  }
}