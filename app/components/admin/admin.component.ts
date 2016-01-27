import {Component, EventEmitter, Input} from 'angular2/core';

import {UsersComponent} from './users.component';
import {VersionsComponent} from './versions.component';
import {QueryList} from 'angular2/core';
import {ContentChildren} from 'angular2/core';

@Component({
  selector: 'admin-view',
  templateUrl: './components/admin/admin.component.html',
  styleUrls: ['./components/admin/admin.component.css'],
  directives: [UsersComponent, VersionsComponent]
})
export class AdminComponent {
  public selectedTab: string = 'users';
  public fabPressedEmitter: EventEmitter<string> = new EventEmitter<string>();

  public onFabPressed() {
    this.fabPressedEmitter.emit(this.selectedTab);
  }
}
