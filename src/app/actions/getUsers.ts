import prisma from "@/lib/prisma/prismadb";
import getSession from "./getSession";

const getUsers = async () => {
  const session:any = await getSession();

  if (!session?.user?.email) {
    return [];
  }

  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        NOT: {
          email: session.user.email,
        },
      },
    });

    return users;
  } catch (err: any) {
    return [];
  }
};

export default getUsers;
