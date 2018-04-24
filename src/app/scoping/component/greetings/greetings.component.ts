import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { User } from '@models/user';

@Component({
  selector: 'app-greetings',
  templateUrl: './greetings.component.html',
  styleUrls: ['./greetings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GreetingsComponent {
  @Input() user: User;
}
