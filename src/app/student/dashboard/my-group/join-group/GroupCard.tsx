import JoinGroupModel from "./JoinGroupModel";
import prisma from "@/lib/prisma/prismadb";

export default async function GroupCard() {
  const groups = await prisma.groups
    .findMany({
      include: {
        members: true,
      },
    })
    .finally(() => prisma.$disconnect());

  if ((await groups.length) === 0)
    return "No groups available at the moment. Contact your Lecturer.";

  return (
    <>
      {groups?.map((group) => {
        return (
          <div
            key={group.id}
            className="dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl bg-white py-6 px-8 shadow-default "
          >
            <div className="mt-0 flex items-end justify-between">
              <div className="flex flex-col">
                <h4 className="text-title-ms font-bold text-black dark:text-white">
                  Group: {group.groupNumber}
                </h4>
                <span className="text-sm font-medium">
                  Members: {group.members.length}/6
                </span>
              </div>

              <div className="inline-flex bg-primary items-center justify-center align-middle px-3 py-2 text-sm font-medium text-center">
                <JoinGroupModel groupId={group.id} />
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
