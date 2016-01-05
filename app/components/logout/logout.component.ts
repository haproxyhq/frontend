import {Component}              from 'angular2/core';
import {Router}                 from 'angular2/router';

import {GlobalStorageService}   from '../../services/general/global-storage.service';

@Component({
  selector: 'logout',
  template: ''
})

export class LogoutComponent {

  constructor(private _globalStorage: GlobalStorageService, private _router: Router) {
    if (this._globalStorage.clear()) this._router.navigate(['Login']);
  }

}
