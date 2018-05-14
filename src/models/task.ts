export interface Task {
  name: string;
  description: string;
  votes?: Votes;
  estimate?: number;
}

export interface Votes {
  [userId: string]: number;
}
