import {Component}                  from 'angular2/core';

import {GlobalStorageService}       from '../../services/general/global-storage.service';

import {ProtectedDirective}         from '../../directives/general/protected.directive';

@Component({
  selector: 'settings',
  templateUrl: './components/settings/settings.component.html',
  styleUrls: ['./components/settings/settings.component.css'],
  directives: [ProtectedDirective]
})

export class SettingsComponent {
  constructor(private _globalStorage: GlobalStorageService) { }

}
