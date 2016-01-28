import {Component}   from 'angular2/core';
import {Input} from 'angular2/core';
import {Output} from 'angular2/core';
import {EventEmitter} from 'angular2/core';

import {User} from '../../models/wrapper/user.model';

import {SaveCancelFabsComponent} from '../general/save-cancel-fabs.component';
import {InputFieldComponent} from '../general/input-field.component';
import {OnInit} from 'angular2/core';
import {UserService} from '../../services/user/user.service';
import {ToastModel} from '../../models/toast.model';

declare var $;

@Component({
  selector: 'user-detail',
  templateUrl: './components/admin/user-detail.component.html',
  styleUrls: ['./components/admin/user-detail.component.css'],
  directives: [InputFieldComponent, SaveCancelFabsComponent]
})
export class UserDetailComponent implements OnInit {
  @Input() user: User;
  @Input() index: number;
  @Output() deletePressed: EventEmitter<User> = new EventEmitter<User>();

  public userCopy: User;

  constructor(private _userService: UserService) {}

  ngOnInit(): void {
    this.userCopy = new User(this.user);
  }

  public saveChanges(): void {
    if(this.user.getSelfLink()) {
      this._userService.saveUser(this.userCopy).subscribe((user: User) => {
        if(user !== null) {
          this.user = this.userCopy;
          $.snackbar(new ToastModel('Changed saved!'));
        } else {
          $.snackbar(new ToastModel('Error occured!'));
        }
      });
    } else {

    }
  }

  public revertChanges(): void {

  }

  private _deleteUser(): void {
    this.deletePressed.emit(this.user);
  }
}
