import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-session-access',
  templateUrl: './session-access.component.html',
  styleUrls: ['./session-access.component.scss'],
})
export class SessionAccessComponent implements OnInit {
  accessForm: FormGroup;
  type: string;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.createForm();
  }

  setType(type: string) {
    this.type = type;
  }

  continue() {
    if (this.accessForm.valid) {
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
