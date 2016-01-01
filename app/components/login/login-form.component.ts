import {Component, Input, EventEmitter}   from 'angular2/core';
import {NgForm}                           from 'angular2/common';

import {Credentials}                      from '../../models/credentials.model';
import {FormResult}                       from '../../models/form-result.model';

import {AuthenticationService}            from '../../services/general/authentication.service';

@Component({
  selector: 'login-form',
  templateUrl: './components/login/login-form.component.html',
  styleUrls: ['./components/login/login-form.component.css']
})

export class LoginFormComponent {
  @Input() formResult: FormResult;
  //hacking this with an @Input because @Output does not pass the argument to the parent
  @Input() loginComplete: EventEmitter<boolean>;

  model = new Credentials();

  constructor(private _authenticationService: AuthenticationService) { }

  onSubmit() {
    this._authenticationService.login(JSON.stringify(this.model))
      .subscribe(
        res => {
          this.formResult.submitted = true;
          this.formResult.success = res;
          this.loginComplete.next(res);
        },
        () => { }
      );
  }
}
