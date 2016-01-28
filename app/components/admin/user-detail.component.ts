import {Component}   from 'angular2/core';
import {Input} from 'angular2/core';

import {User} from '../../models/wrapper/user.model';

@Component({
  selector: 'user-detail',
  templateUrl: './components/admin/user-detail.component.html',
  styleUrls: ['./components/admin/user-detail.component.css']
})
export class UserDetailComponent {
  @Input() user: User;
  @Input() index: number;
}
