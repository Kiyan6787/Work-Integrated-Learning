"use client"

import * as z from 'zod';
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Attachment } from '@prisma/client';
import { File, Loader2, PlusCircle, X } from 'lucide-react';
import { FileUpload } from './file-upload';

interface AttachmentFormProps {
  initialData: { attachments: Attachment[] };
}

const formSchema = z.object({
  url: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
});

export const AttachmentForm = ({ initialData }: AttachmentFormProps) => {
  
  const [isEditing, setIsEditing] = useState(false);
  const [uploadingAttachments, setUploadingAttachments] = useState<string[]>([]);
  const router = useRouter();

  const toggleEdit = () => setIsEditing((current) => !current);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setUploadingAttachments((prev) => [...prev, values.url]);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      await axios.post(`/api/lecturer/attachments`, values);

      setUploadingAttachments((prev) => prev.filter((url) => url !== values.url));

      toast.success("Attachment uploaded");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className='mt-6 border rounded-md p-4'>
      <div className='font-medium flex items-center justify-between'>
        Upload Files
        <button onClick={toggleEdit} disabled={uploadingAttachments.length > 0}>
          {isEditing ? <>Cancel</> : (
            <>
              <PlusCircle className='h-4 w-4 mr-2' />
              Add a file
            </>
          )}
        </button>
      </div>
      {!isEditing && (
        <>
          {initialData.attachments?.length === 0 && (
            <p className='text-sm mt-2 text-slate-500 italic'>
              No attachments yet
            </p>
          )}
          {initialData.attachments?.length > 0 && (
            <div className='space-y-2'>
              {initialData.attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className='flex items-center p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md'
                >
                  <File className='h-4 w-4 mr-2 flex-shrink-0' />
                  <p className='text-sm line-clamp-1'>
                    {attachment.name}
                  </p>
                </div>
              ))}
            </div>
          )}
        </>
      )}
      {isEditing && (
        <div>
          <div className="mb-6">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              File Title
            </label>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Name of file..."
              required
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your message
            </label>
            <textarea
              id="message"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Leave a comment..."
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <FileUpload
            endpoint='studentsAttachment'
            onChange={(url) => {
              if (url) {
                onSubmit({
                  url: url,
                  title: title,
                  description: description
                });
              }
            }}
          />
          {uploadingAttachments.length > 0 && (
            <div className='text-xs text-muted-foreground mt-4'>
              Uploading attachments...
              <ul>
                {uploadingAttachments.map((url) => (
                  <li key={url}>{url}</li>
                ))}
              </ul>
            </div>
          )}
          <div className='text-xs text-muted-foreground mt-4'>
            Add anything your students might need.
          </div>
        </div>
      )}
    </div>
  );
};

