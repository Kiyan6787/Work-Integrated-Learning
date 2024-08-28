import React from 'react';
import { AttachmentForm } from "@/app/components/attachment-form";
import { Attachment } from "@prisma/client";

interface PageProps {
  data: Attachment[];
}

const Page = ({ data }: any) => {
  const initialData = { attachments: data };
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-1 2xl:gap-8">
      <AttachmentForm initialData={initialData} />
    </div>
  );
};

export default Page;
