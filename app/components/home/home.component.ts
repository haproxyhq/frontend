import {Component}            from 'angular2/core';

import {GlobalStorageService} from '../../services/general/global-storage.service';
import {User} from '../../models/wrapper/user.model';
import {OnInit} from 'angular2/core';

@Component({
  selector: 'home',
  templateUrl: './components/home/home.component.html',
  styleUrls: ['./components/home/home.component.css']
})

export class HomeComponent implements OnInit {
  private _user: User;
  private _animationSequences: Array<boolean> = [];

  constructor(private _globalStorage: GlobalStorageService) {}

  ngOnInit(): any {
    this._user = this._globalStorage.user;
  }
}
