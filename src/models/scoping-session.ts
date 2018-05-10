import { Task } from '@models/task';
import { User } from '@models/user';

export interface ScopingSession {
  id: string;
  projectName: string;
  ownerId: string;
  currentTaskId: string;
  numTasks: number;
  numScopedTasks: number;
  tasks: { [taskId: string]: Task };
  participants: { [userId: string]: number };
}

export enum SessionStatus {
  COMPLETE = 'Session Completed',
  INCOMPLETE = 'Session Incomplete',
}
