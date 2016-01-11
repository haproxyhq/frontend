import {Component}              from 'angular2/core';
import {Router}                 from 'angular2/router';

import {AuthenticationService}  from '../../services/general/authentication.service';

import {ToastModel}             from '../../models/toast.model';

declare var $;

@Component({
  selector: 'logout',
  template: ''
})

export class LogoutComponent {

  constructor(private _authenticationService: AuthenticationService, private _router: Router) {
    if (this._authenticationService.logout()) {
      this._router.navigate(['Login']);
    } else $.snackbar(new ToastModel('Logout failed', '', 3000, true));
  }

}
