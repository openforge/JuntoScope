import { ScopingSession } from '@models/scoping-session';

export interface HistoryItem extends Partial<ScopingSession> {
  id?: string;
  userId: string;
  connectionId: string;
  sessionId: string;
  users: { [uid: string]: number };
}
