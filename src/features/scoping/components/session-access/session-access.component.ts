import {
  Component,
  OnInit,
  Output,
  Input,
  EventEmitter,
  OnDestroy
} from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ScopingFacade } from "../../store/scoping.facade";

import { SessionValidation } from "../../../../models/scoping-session";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../store/app.reducer";
import { CleanErrorAction } from "../../store/scoping.actions";
@Component({
  selector: "app-session-access",
  templateUrl: "./session-access.component.html"
})
export class SessionAccessComponent implements OnInit, OnDestroy {
  accessForm: FormGroup;
  error$ = this.scopingFacade.error$;

  @Input() sessionLink: string;
  @Output() access = new EventEmitter<SessionValidation>();

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private scopingFacade: ScopingFacade
  ) {}

  ngOnInit() {
    this.createForm();
  }

  ngOnDestroy() {
    this.store.dispatch(new CleanErrorAction());
  }

  continue() {
    if (this.accessForm.valid) {
      const sessionValidation = {
        sessionLink: this.sessionLink,
        accessCode: this.accessForm.get("code").value
      };
      this.access.emit(sessionValidation);
    } else {
      this.accessForm.get("code").markAsDirty();
    }
  }

  createForm() {
    this.accessForm = this.fb.group({
      code: ["", Validators.required]
    });
  }
}
