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

  revertChanges() {
    this._user = this._restoreService.reset();
  }
}
