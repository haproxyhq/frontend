import {Component}                  from 'angular2/core';

import {InputFieldComponent}        from '../general/input-field.component';
import {SaveCancelFabsComponent}    from '../general/save-cancel-fabs.component';

import {GlobalStorageService}       from '../../services/general/global-storage.service';
import {UserService}                from '../../services/user/user.service';
import {RestoreService}             from '../../services/general/restore.service';

import {ProtectedDirective}         from '../../directives/general/protected.directive';

import {User}                       from '../../models/wrapper/user.model';
import {ToastModel}                 from '../../models/toast.model';

declare var $;

@Component({
  selector: 'settings-profile',
  providers: [RestoreService],
  templateUrl: './components/settings/settings-profile.component.html',
  styleUrls: ['./components/settings/settings-profile.component.css'],
  directives: [ProtectedDirective, InputFieldComponent, SaveCancelFabsComponent]
})

export class SettingsProfileComponent {
  private _user: User;
  private _password: Array<string> = [];

  constructor(private _globalStorage: GlobalStorageService,
    private _restoreService: RestoreService<User>,
    private _userService: UserService) {
    this._restoreService.setItem(this._globalStorage.user);
    this._user = this._restoreService.getItem();
  }

  saveChanges() {
    this._userService.saveUser(new User(this._user)).subscribe(
      (user) => {
        if (user !== null) {
          this._globalStorage.user = this._user;
          $.snackbar(new ToastModel('Profile saved'));
        } else {
          $.snackbar(new ToastModel('Error saving profile'));
        }
      }
    );
  }

  changePassword() {
    console.log(this._password);
    if (this._password[0] === this._password[1]) {
      let tmpUser: User = new User(this._restoreService.getOriginalItem());
      tmpUser.password = this._password[0];
      this._userService.changePassword(tmpUser).subscribe(
        (user) => {
          if (user !== null) {
            this._globalStorage.user = this._user;
            this._password = [];
            $.snackbar(new ToastModel('Password changed'));
          } else {
            $.snackbar(new ToastModel('Error changing password'));
          }
        }
      );
    } else if (this._password[0] !== '' && this._password[1] !== '') {
      $.snackbar(new ToastModel('Passwords did not match'));
    }
  }

  revertPasswordChange() {
    this._password = [];
  }

  revertChanges() {
    this._user = this._restoreService.reset();
  }
}
