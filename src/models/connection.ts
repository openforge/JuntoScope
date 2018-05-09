interface Project {
  name: string;
}

export interface Connection {
  id?: string;
  type: string;
  token: string;
  externalData?: any;
  projects?: Project[];
}
