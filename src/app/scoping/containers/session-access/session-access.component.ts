import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ScopingFacade } from '@app/scoping/state/scoping.facade';
import { RouterFacade } from '@app/state/router.facade';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-session-access',
  templateUrl: './session-access.component.html',
  styleUrls: ['./session-access.component.scss'],
})
export class SessionAccessComponent implements OnInit {
  accessForm: FormGroup;
  sessionLink: string;
  params$ = this.routerFacade.params$;
  error$ = this.scopingFacade.error$;

  constructor(
    private fb: FormBuilder,
    private scopingFacade: ScopingFacade,
    private routerFacade: RouterFacade
  ) {}

  ngOnInit() {
    this.createForm();
    this.params$.pipe(take(1)).subscribe(params => {
      this.sessionLink = params.sessionCode;
    });
  }

  continue() {
    if (this.accessForm.valid) {
      const sessionValidation = {
        sessionLink: this.sessionLink,
        accessCode: this.accessForm.get('code').value,
      };

      this.scopingFacade.validateSession(sessionValidation);
    } else {
      this.accessForm.get('code').markAsDirty();
    }
  }

  createForm() {
    this.accessForm = this.fb.group({
      code: ['', Validators.required],
    });
  }
}
