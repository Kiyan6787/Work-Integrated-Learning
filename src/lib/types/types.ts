import { type } from "os";
import { Conversation, Message, User } from "@prisma/client";

export type FullMessageType = Message & {
  sender: User;
  seen: User[];
};

export type FullConversationType = Conversation & {
  users: User[];
  messages: FullMessageType[];
};

export type UserData = {
  id: string;
  sub: string;
  name: string;
  email: string;
  emailVerified: null | boolean; // Adjust the type based on your needs
  image: string;
  createdAt: string; // Assuming this is a string representation of a date
  hashedPassword: string;
  role: string;
  groupId: string;
}; 

export type UserSession = {
  user: {
    name: string;
    email: string;
    image: string;
    id: string;
    role: string;
    subscribed?: undefined | boolean; // You can adjust the type for 'subscribed' based on your use case
  };
};;

export type Groups = {
  id: string;
  lecturerId: string;
  projectId?: string | null;
  groupNumber: string;
  createdAt: Date;
  updatedAt: Date;
  members: string[];
};

export type Projects = {
  id: string;
  ownerId: string;
  organization?: string | null;
  projectTitle?: string | null;
  projectBrief?: string | null;
  projectRequirements?: string | null;
  isApproved: string;
  assignedTo?: string | null;
  createdAt: Date;
  updatedAt: Date;
  files: string[];
  tasks: Task[];
};

export type Task = {
  id: string;
  projectId: string;
  type: string;
  taskTitle: string;
  taskDescription: string;
  taskDueDate?: Date | null;
  createdAt: Date;
  updatedAt: Date;
  status: boolean;
  Project: Projects;
};