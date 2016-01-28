import {Component}   from 'angular2/core';
import {OnInit} from 'angular2/core';
import {OnDestroy} from 'angular2/core';
import {EventEmitter} from 'angular2/core';
import {Input} from 'angular2/core';

import {AbcIconComponent} from '../general/abc-icon.component';
import {UserDetailComponent} from './user-detail.component';

import {UserService} from '../../services/user/user.service';

import {User} from '../../models/wrapper/user.model';


@Component({
  selector: 'users-view',
  templateUrl: './components/admin/users.component.html',
  styleUrls: ['./components/admin/users.component.css'],
  directives: [UserDetailComponent]
})
export class UsersComponent implements OnInit, OnDestroy {
  @Input() fabPressedEmitter: EventEmitter<string> = new EventEmitter<string>();

  private _users: Array<User> = [];
  private _fabPressedSubscription: any;

  constructor(private _userService: UserService) {}

  ngOnInit(): void {
    this._userService.getUsers().subscribe((users) => {
      this._users = users;
    });
    this._fabPressedSubscription = this.fabPressedEmitter.subscribe((selectedTab) => {
      this._users.push(new User({}));
    });
  }

  ngOnDestroy(): void {
    this._fabPressedSubscription.unsubscribe();
  }

  private _deleteUser(): void {
    console.log('delete pressed');
  }
}
