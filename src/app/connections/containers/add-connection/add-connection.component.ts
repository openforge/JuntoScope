import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ConnectionFacade } from '@app/connections/state/connection.facade';

@Component({
  selector: 'app-add-connection',
  templateUrl: './add-connection.component.html',
  styleUrls: ['./add-connection.component.scss'],
})
export class AddConnectionComponent implements OnInit {
  connectionForm: FormGroup;

  addError$ = this.connectionFacade.error$;

  constructor(
    private fb: FormBuilder,
    private connectionFacade: ConnectionFacade
  ) {}

  ngOnInit() {
    this.createForm();
  }

  continue() {
    if (this.connectionForm.valid) {
      const connection = this.connectionForm.value;

      this.connectionFacade.addConnection(connection);
    } else {
      this.connectionForm.get('token').markAsDirty();
    }
  }

  createForm() {
    this.connectionForm = this.fb.group({
      type: ['', Validators.required],
      token: ['', Validators.required],
    });
  }
}
