import { Task } from '@models/task';

export interface ScopingSession {
  projectName: string;
  currentTaskId: string;
  numTasks: number;
  numScopedTasks: number;
  tasks: { [taskId: string]: Task };
}

export enum SessionStatus {
  COMPLETE = 'Session Completed',
  INCOMPLETE = 'Session Incomplete',
}
