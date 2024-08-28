
import getCurrentUser from "@/app/actions/getCurrentUser";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const handleAuth = () => {
  const userId = getCurrentUser();
  if (!userId) throw new Error("Unauthorised");
  return { userId };
}

export const ourFileRouter = {
  studentsAttachment: f(["text", "image", "video", "audio", "pdf"])
    .middleware(() => handleAuth())
    .onUploadComplete(() => { }),
  
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;