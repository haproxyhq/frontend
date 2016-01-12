import {Component, EventEmitter}  from 'angular2/core';
import {Router}                   from 'angular2/router';
import {NgIf}                     from 'angular2/common';

import {LoginFormComponent}       from '../login/login-form.component';

import {FormResult}               from '../../models/form-result.model';
import {ToastModel}               from '../../models/toast.model';

import {GlobalStorageService}     from '../../services/general/global-storage.service';

//references doesn't work here because angular defines $ as another type than jquery does: https://github.com/angular/angular/issues/4725
declare var $;

@Component({
  selector: 'login',
  templateUrl: './components/login/login.component.html',
  styleUrls: ['./components/login/login.component.css'],
  directives: [LoginFormComponent]
})

export class LoginComponent {
  public formResult: FormResult = new FormResult();
  public loginComplete: EventEmitter<boolean> = new EventEmitter();

  constructor(private _globalStorage: GlobalStorageService, private _router: Router) {
    this.loginComplete.subscribe((res) => {
      if (res) {
        this._router.navigate(['Home']);
      } else {
        $.snackbar(new ToastModel('Login failed'));
      }
    },
    () => {});
  }
}
