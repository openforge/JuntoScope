import { Component, OnInit, Output, Input, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ScopingFacade } from "../../store/scoping.facade";

import { SessionValidation } from "../../../../models/scoping-session";

@Component({
  selector: "app-session-access",
  templateUrl: "./session-access.component.html",
  styleUrls: ["./session-access.component.scss"]
})
export class SessionAccessComponent implements OnInit {
  accessForm: FormGroup;
  error$ = this.scopingFacade.error$;

  @Input() sessionLink: string;
  @Output() access = new EventEmitter<SessionValidation>();

  constructor(private fb: FormBuilder, private scopingFacade: ScopingFacade) {}

  ngOnInit() {
    this.createForm();
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
