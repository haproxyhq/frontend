import {Component}            from 'angular2/core';

import {GlobalStorageService} from '../../services/general/global-storage.service';

@Component({
  selector: 'home',
  templateUrl: './components/home/home.component.html',
  styleUrls: ['./components/home/home.component.css']
})

export class HomeComponent {
  constructor(private _globalStorage: GlobalStorageService) { }
}
