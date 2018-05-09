import { Project } from '@models/project';

export interface Connection {
  id?: string;
  type: string;
  token: string;
  externalData?: any;
  projects?: { [projectId: string]: Project };
}
