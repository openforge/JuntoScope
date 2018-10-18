export interface Task {
  name: string;
  description: string;
  votes?: Votes;
  estimate?: number;
  id?: number;
}

export interface Votes {
  [userId: string]: number;
}
