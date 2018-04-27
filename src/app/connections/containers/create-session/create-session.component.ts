import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterFacade } from '@app/state/router.facade';

@Component({
  selector: 'app-create-session',
  templateUrl: './create-session.component.html',
  styleUrls: ['./create-session.component.scss'],
})
export class CreateSessionComponent implements OnInit {
  sessionForm: FormGroup;
  step: number;

  constructor(private fb: FormBuilder, public routerFacade: RouterFacade) {}

  ngOnInit() {
    this.step = 0;
    this.createForm();
  }

  goToTaskLists() {
    if (this.sessionForm.get('project').valid) {
      this.step = 1;
    } else {
      this.sessionForm.get('project').markAsDirty();
    }
  }

  goToScopeLink() {
    if (this.sessionForm.get('tasklist').valid) {
      this.step = 2;
    } else {
      this.sessionForm.get('tasklist').markAsDirty();
    }
  }

  goBack() {
    if (this.step > 0) {
      this.step--;
    } else {
      this.routerFacade.back();
    }
  }

  goToScoping(sessionId) {
    this.routerFacade.navigate({ path: [`/scoping/${sessionId}`] });
  }

  createForm() {
    this.sessionForm = this.fb.group({
      project: ['', Validators.required],
      tasklist: ['', Validators.required],
    });
  }
}
