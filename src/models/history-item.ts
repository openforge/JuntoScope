import { ScopingSession, SessionStatus } from '@models/scoping-session';
import { SessionUserType } from '@models/user';

export interface HistoryItem extends Partial<ScopingSession> {
  id?: string;
  ownerId: string;
  connectionId: string;
  sessionId: string;
  participants: { [uid: string]: number };
}

export interface HistoryItemOptionEvent {
  userType: SessionUserType;
  item: HistoryItem;
}

export interface HistoryItemDetailEvent {
  status: SessionStatus;
  item: HistoryItem;
}
