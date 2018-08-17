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
import { PopupService } from "../../../../shared/popup.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-session-access",
  templateUrl: "./session-access.component.html"
})
export class SessionAccessComponent implements OnInit, OnDestroy {
  accessForm: FormGroup;
  error$ = this.scopingFacade.error$;
  errorSubscription: Subscription;

  @Input() sessionLink: string;
  @Output() access = new EventEmitter<SessionValidation>();

  constructor(
    private fb: FormBuilder,
    private scopingFacade: ScopingFacade,
    private popupSvc: PopupService
  ) {}

  ngOnInit() {
    this.createForm();
    this.errorSubscription = this.error$.subscribe(error => {
      if (error) {
        this.popupSvc.simpleAlert("Uh Oh!", error, "OK");
        this.scopingFacade.ClearErrorAction();
      }
    });
  }

  ngOnDestroy() {
    this.errorSubscription.unsubscribe();
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
