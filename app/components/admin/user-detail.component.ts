import {Component}   from 'angular2/core';
import {Input} from 'angular2/core';
import {Output} from 'angular2/core';
import {EventEmitter} from 'angular2/core';

import {User} from '../../models/wrapper/user.model';

import {SaveCancelFabsComponent} from '../general/save-cancel-fabs.component';
import {InputFieldComponent} from '../general/input-field.component';

@Component({
  selector: 'user-detail',
  templateUrl: './components/admin/user-detail.component.html',
  styleUrls: ['./components/admin/user-detail.component.css'],
  directives: [InputFieldComponent, SaveCancelFabsComponent]
})
export class UserDetailComponent {
  @Input() user: User;
  @Input() index: number;
  @Output() deletePressed: EventEmitter = new EventEmitter();

  private _deleteUser(): void {
    this.deletePressed.emit(null);
  }
}
