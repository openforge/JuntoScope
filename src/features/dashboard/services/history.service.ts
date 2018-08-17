import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AngularFirestore, DocumentChangeAction } from "angularfire2/firestore";
import { Subject, of, Subscription } from "rxjs";
import {
  tap,
  share,
  takeUntil,
  switchMap,
  map,
  catchError
} from "rxjs/operators";
import { AppFacade } from "../../../store/app.facade";
import { ScopingSession } from "../../../models/scoping-session";
import { HistoryItem } from "../../../models/history-item";
import { Task } from "../../../models/task";
import { environment } from "../../../environments/environment";

@Injectable()
export class HistoryService {
  private uidSub: Subscription;
  private refresh = new Subject<never>();
  private refresh$ = this.refresh.asObservable().pipe(share());

  private historyItemChanges = new Subject<DocumentChangeAction[]>();
  private historyItemChanges$ = this.historyItemChanges.asObservable().pipe(
    tap(changes => {
      const added = changes.filter(change => change.type === "added");

      if (added.length) {
        this.lastDoc = added.pop().payload.doc;
      }
    }),
    share()
  );

  private lastDoc = null;
  private query: {
    field?: string;
    limit: number;
    direction: "desc" | "asc";
  } = { limit: 5, direction: "desc" };

  constructor(
    private appFacade: AppFacade,
    private afs: AngularFirestore,
    private http: HttpClient
  ) {}

  loadHistoryItems() {
    this.refresh.next();

    this.uidSub = this.appFacade.uid$
      .pipe(
        tap(uid => {
          this.query.field = `participants.${uid}`;
        }),
        switchMap(() => this.getHistoryItems())
      )
      .subscribe();

    return this.historyItemChanges$;
  }

  logOut() {
    this.uidSub.unsubscribe();
  }

  loadMoreHistoryItems() {
    this.getHistoryItems({ paginating: true }).subscribe();

    return this.historyItemChanges$;
  }

  getSession({ ownerId, connectionId, sessionId }: Partial<HistoryItem>) {
    return this.afs
      .doc<ScopingSession>(
        `users/${ownerId}/connections/${connectionId}/sessions/${sessionId}`
      )
      .valueChanges()
      .pipe(
        switchMap(session =>
          this.getSessionTask(
            { ownerId, connectionId, sessionId },
            session.currentTaskId
          ).pipe(
            map(task => {
              session.tasks = { [session.currentTaskId]: task };
              return session;
            })
          )
        ),
        catchError(err => of(err))
      );
  }

  deleteSession(sessionLink) {
    this.refresh.next();
    return this.http.delete(
      `${environment.apiBaseUrl}/session-links/${sessionLink}`
    );
  }

  refreshAccessCode(sessionCode) {
    return this.http.get(
      `${environment.apiBaseUrl}/session-links/${sessionCode}/refresh`
    );
  }

  getSessionTask(
    { ownerId, connectionId, sessionId }: Partial<HistoryItem>,
    taskId: string
  ) {
    return this.afs
      .doc<Task>(
        `users/${ownerId}/connections/${connectionId}/sessions/${sessionId}/tasks/${taskId}`
      )
      .valueChanges();
  }

  private getHistoryItems({ paginating } = { paginating: false }) {
    return this.afs
      .collection("public/data/sessions", ref => {
        const { field, direction, limit } = this.query;

        let query = ref.where(field, ">", 0).orderBy(field, direction);

        if (paginating) {
          query = query.startAfter(this.lastDoc);
        }

        return query.limit(limit);
      })
      .stateChanges()
      .pipe(
        tap(changes => {
          this.historyItemChanges.next(changes);
        }),
        takeUntil(this.refresh$)
      );
  }
}
