import {Component}   from 'angular2/core';

import {UsersComponent} from './users.component';
import {VersionsComponent} from './versions.component';

@Component({
  selector: 'admin-view',
  templateUrl: './components/admin/admin.component.html',
  styleUrls: ['./components/admin/admin.component.css'],
  directives: [UsersComponent, VersionsComponent]
})
export class AdminComponent {
  public selectedTab: string = 'users';
}
