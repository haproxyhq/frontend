import {Component}            from 'angular2/core';

import {GlobalStorageService} from '../../services/general/global-storage.service';

import {ProtectedDirective}   from '../../directives/general/protected.directive';

@Component({
  selector: 'agents',
  templateUrl: './components/agent/agents.component.html',
  styleUrls: ['./components/agent/agents.component.css'],
  directives: [ProtectedDirective]
})

export class AgentsComponent {
  constructor(private _globalStorage: GlobalStorageService) { }
}
