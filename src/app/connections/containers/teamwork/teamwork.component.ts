import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ConnectionFacade } from '@app/connections/state/connection.facade';

@Component({
  selector: 'app-teamwork',
  templateUrl: './teamwork.component.html',
  styleUrls: ['./teamwork.component.scss'],
})
export class TeamworkComponent implements OnInit {
  tokenForm: FormGroup;

  addError$ = this.connectionFacade.error$;

  constructor(
    private fb: FormBuilder,
    private connectionFacade: ConnectionFacade
  ) {}

  ngOnInit() {
    this.createForm();
  }

  continue() {
    if (this.tokenForm.valid) {
      const connection = {
        token: this.tokenForm.get('token').value,
        type: 'teamwork',
      };

      this.connectionFacade.addConnection(connection);
    } else {
      this.tokenForm.get('token').markAsDirty();
    }
  }

  createForm() {
    this.tokenForm = this.fb.group({
      token: ['', Validators.required],
    });
  }
}
