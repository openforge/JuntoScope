import { AngularFireAuth } from 'angularfire2/auth';

export class AngularFireAuthMock extends AngularFireAuth {
  login() {}

  logout() {}
}
