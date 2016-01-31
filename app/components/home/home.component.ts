import {Component}            from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {OnInit} from 'angular2/core';

import {GlobalStorageService} from '../../services/general/global-storage.service';
import {User} from '../../models/wrapper/user.model';

@Component({
  selector: 'home',
  templateUrl: './components/home/home.component.html',
  styleUrls: ['./components/home/home.component.css'],
  directives: [ROUTER_DIRECTIVES]
})

export class HomeComponent {
  constructor(private _globalStorage: GlobalStorageService) {}
}
