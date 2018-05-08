import { Component, OnInit, Input } from '@angular/core';
import { Connection } from '@models/connection';
import { RouterFacade } from '@app/state/router.facade';

@Component({
  selector: 'app-create-session',
  templateUrl: './create-session.component.html',
  styleUrls: ['./create-session.component.scss'],
})
export class CreateSessionComponent implements OnInit {
  @Input() connections: Connection[];

  constructor(private routerFacade: RouterFacade) {}

  ngOnInit() {}

  goSelectProject() {
    this.routerFacade.navigate({
      path: ['dashboard/create-session/select-project'],
    });
  }
}
