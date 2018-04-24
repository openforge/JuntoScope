import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';

import { AppState } from '../../../state/app.state';
import { Store } from '@ngrx/store';

import { AuthFacade } from '../../../authentication/state/auth.facade';
import { AuthUiState } from '../../../authentication/state/auth.reducer';

import * as ConnectionsActions from '../../state/connections.actions';

@Component({
  selector: 'app-teamwork',
  templateUrl: './teamwork.component.html',
  styleUrls: ['./teamwork.component.scss'],
})
export class TeamworkComponent implements OnInit {
  user$ = this.authFacade.user$;
  tokenForm: FormGroup;

  constructor(
    private authFacade: AuthFacade,
    private fb: FormBuilder,
    private http: HttpClient,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.createForm();
  }

  continue(event: UIEvent) {
    event.preventDefault();
    if (this.tokenForm.valid) {
      this.store.dispatch(
        new ConnectionsActions.AddConnectionAction({
          token: this.tokenForm.get('token').value,
          type: 'teamwork',
        })
      );
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
