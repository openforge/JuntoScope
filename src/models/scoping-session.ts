import { Task } from "./task";

export interface ScopingSession {
  id: string;
  sessionId: string;
  projectName: string;
  ownerId: string;
  connectionId: string;
  currentTaskId: string;
  numTasks: number;
  numScopedTasks: number;
  tasks: { [taskId: string]: Task };
  participants: { [userId: string]: number };
}

export enum SessionStatus {
  COMPLETE = "Session Completed",
  INCOMPLETE = "Session Incomplete"
}

export interface SessionValidation {
  sessionLink: string;
  accessCode: string;
}
