import prisma from "@/lib/prisma/prismadb";

import getSession from "./getSession";

const getCurrentUser = async () => {
  try {
    const session:any = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!currentUser) {
      return null;
    }

    return currentUser;
  } catch (err: any) {
    return null;
  }
};

export default getCurrentUser;
