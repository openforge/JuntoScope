export interface User {
  uid: string;
  displayName: string;
}

export enum SessionUserType {
  MODERATOR = 'Session Moderator',
  PARTICIPANT = 'Session Participant',
}
