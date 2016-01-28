import {Component}   from 'angular2/core';
import {Input} from 'angular2/core';
import {Output} from 'angular2/core';
import {EventEmitter} from 'angular2/core';

import {User} from '../../models/wrapper/user.model';

import {SaveCancelFabsComponent} from '../general/save-cancel-fabs.component';
import {InputFieldComponent} from '../general/input-field.component';
import {OnInit} from 'angular2/core';

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

  ngOnInit(): void {
    this.userCopy = new User(this.user);
    console.log(this.userCopy);
  }

  public saveChanges(): void {

  }

  public revertChanges(): void {

  }

  private _deleteUser(): void {
    this.deletePressed.emit(this.user);
  }
}
