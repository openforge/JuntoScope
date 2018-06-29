import { TaskList } from "./task-list";

export interface Project {
  id?: string;
  name: string;
  taskLists: { [id: string]: TaskList };
}
