import {Component, Input, Output, EventEmitter}   from 'angular2/core';
import {NgForm}                                   from 'angular2/common';

import {Credentials}                              from '../../models/credentials.model';
import {FormResult}                               from '../../models/form-result.model';

import {AuthenticationService}                    from '../../services/general/authentication.service';

@Component({
  selector: 'login-form',
  templateUrl: './components/login/login-form.component.html',
  styleUrls: ['./components/login/login-form.component.css']
})

export class LoginFormComponent {
  @Input() formResult: FormResult;
  @Output() loginComplete = new EventEmitter();

  model = new Credentials();

  constructor(private _authenticationService: AuthenticationService) { }

  onSubmit() {
    this._authenticationService.login(this.model)
      .subscribe(
        (res) => {
          this.formResult.submitted = true;
          this.formResult.success = res;
          this.loginComplete.next(res);
        },
        () => {}
      );
  }
}
