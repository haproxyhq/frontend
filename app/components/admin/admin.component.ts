import {Component, EventEmitter, Input, OnInit} from 'angular2/core';
import {RouteParams, Router, ROUTER_DIRECTIVES} from 'angular2/router';

import {UsersComponent} from './users.component';
import {VersionsComponent} from './versions.component';
import {QueryList} from 'angular2/core';
import {ContentChildren} from 'angular2/core';

import {ProtectedAdminDirective} from '../../directives/general/protected-admin.directive';

@Component({
  selector: 'admin-view',
  templateUrl: './components/admin/admin.component.html',
  styleUrls: ['./components/admin/admin.component.css'],
  directives: [ProtectedAdminDirective, UsersComponent, VersionsComponent, ROUTER_DIRECTIVES]
})
export class AdminComponent implements OnInit {
  public selectedTab: string = 'users';
  public fabPressedEmitter: EventEmitter<string> = new EventEmitter<string>();

  constructor(private _router: Router, private _routeParams: RouteParams) {}

  ngOnInit() {
    this.selectedTab = this._routeParams.get('route');
  }

  public onFabPressed() {
    this.fabPressedEmitter.emit(this.selectedTab);
  }

  private _selectAgent(route: string) {
    this._router.navigate(['Admin', { route: route }]);
  }
}
