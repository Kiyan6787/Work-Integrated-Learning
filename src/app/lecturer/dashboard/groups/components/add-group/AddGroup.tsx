import prisma from "@/lib/prisma/prismadb";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function AddGroup() {
  const session: any = await getServerSession(authOptions);
  const groupCount = await prisma.groups
    .findMany()
    .finally(() => prisma.$disconnect());

  async function addGroup() {
    "use server";

    await prisma.groups
      .create({
        data: {
          lecturerId: session.user.id,
          projectId: "",
          groupNumber: `${groupCount.length + 1}`,
        },
      })
      .finally(() => prisma.$disconnect());
    revalidatePath("/lecturer/dashboard/groups");
  }

  return (
    <>
      <form action={addGroup}>
        <button
          className="block text-white shadow-lg hover:shadow-xl bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none   font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700  "
          type="submit"
        >
          Add Group
        </button>
      </form>
    </>
  );
}
