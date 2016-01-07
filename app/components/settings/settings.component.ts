import {Component}                  from 'angular2/core';
import {ROUTER_DIRECTIVES, Router}  from 'angular2/router';

import {GlobalStorageService}       from '../../services/general/global-storage.service';

@Component({
  selector: 'settings',
  templateUrl: './components/settings/settings.component.html',
  styleUrls: ['./components/settings/settings.component.css'],
  directives: [ROUTER_DIRECTIVES]
})

export class SettingsComponent {
  constructor(private _globalStorage: GlobalStorageService, private _router: Router) { }

  isActive(route) {
    return this._router.parent.isRouteActive(this._router.parent.generate(route));
  }
}
