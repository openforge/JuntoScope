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
  type: string;

  addError$ = this.connectionFacade.error$;

  constructor(
    private fb: FormBuilder,
    private connectionFacade: ConnectionFacade
  ) {}

  ngOnInit() {
    this.createForm();
  }

  setType(type: string) {
    this.type = type;
  }

  continue() {
    if (this.connectionForm.valid) {
      const connection = {
        token: this.connectionForm.get('token').value,
        type: this.type,
      };

      this.connectionFacade.addConnection(connection);
    } else {
      this.connectionForm.get('token').markAsDirty();
    }
  }

  createForm() {
    this.connectionForm = this.fb.group({
      token: ['', Validators.required],
    });
  }
}
