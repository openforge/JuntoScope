import { ScopingSession, SessionStatus } from "./scoping-session";
import { SessionUserType } from "./user";

export interface HistoryItem extends Partial<ScopingSession> {
  id?: string;
  ownerId: string;
  connectionId: string;
  sessionId: string;
  sessionCode: string;
  projectId?: string;
  projectName?: string;
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
