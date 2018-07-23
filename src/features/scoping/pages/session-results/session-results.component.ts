import { Component, OnInit } from "@angular/core";
// import { ScopingSession } from '../../../../models/scoping-session';
// import { User } from '@models/user';
import { Store } from "@ngrx/store";
import { AppState } from "../../../../store/app.reducer";
// import { AuthQuery } from '@app/authentication/state/auth.reducer';
import { ScopingFacade } from "../../store/scoping.facade";
import { NavParams } from "ionic-angular";

@Component({
  selector: "app-session-results",
  templateUrl: "./session-results.component.html"
})
export class SessionResultsComponent implements OnInit {
  // session: ScopingSession;
  sessionCode: string;

  constructor(
    private store: Store<AppState>,
    private scopingFacade: ScopingFacade,
    private navParams: NavParams
  ) {
    // this.params$.pipe(take(1)).subscribe(params => {
    //   this.sessionCode = params.sessionCode;
    //   this.scopingFacade.loadSession(this.sessionCode);
    // });
    // this.sessionCode = this.navParams.get('sessionCode');
    // this.scopingFacade.loadSession(this.sessionCode);
    /*
    this.session = {
      id: 'xIUiPVQX1pn0sbKdC6EF',
      ownerId: '4unCMQb5lGgORDo2Y5UUWlBcUHj1',
      connectionId: 'THfDyZ5ql7PbyDvzuyuZ',
      projectName: 'Test project',
      currentTaskId: 'prFpkJAGoM4HnRkajCys',
      numTasks: 1,
      numScopedTasks: 1,
      tasks: {
        prFpkJAGoM4HnRkajCys: {
          name: 'Test task 1',
          description: 'This is a description',
          votes: {
            '4unCMQb5lGgORDo2Y5UUWlBcUHj1': 3,
          },
          estimate: 5,
        },
      },
      participants: {
        '4unCMQb5lGgORDo2Y5UUWlBcUHj1': 1111,
      },
    };
    */
  }

  ngOnInit() {}
}
