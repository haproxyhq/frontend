import {Component}                  from 'angular2/core';
import {ROUTER_DIRECTIVES, Router}  from 'angular2/router';

import {GlobalStorageService}       from '../../services/general/global-storage.service';

import {ProtectedDirective}         from '../../directives/general/protected.directive';

@Component({
  selector: 'settings',
  templateUrl: './components/settings/settings.component.html',
  styleUrls: ['./components/settings/settings.component.css'],
  directives: [ROUTER_DIRECTIVES, ProtectedDirective]
})

export class SettingsComponent {
  constructor(private _globalStorage: GlobalStorageService, private _router: Router) { }

  isActive(route) {
    return this._router.parent.isRouteActive(this._router.parent.generate(route));
  }
}
