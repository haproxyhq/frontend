import {Component}            from 'angular2/core';

import {GlobalStorageService} from '../../services/general/global-storage.service';

import {Agent} from '../../models/wrapper/agent.model';

@Component({
  selector: 'agent',
  templateUrl: './components/agent/agent-detail.component.html',
  styleUrls: ['./components/agent/agent-detail.component.css'],
  inputs: ['agent']
})
export class AgentComponent {
  constructor(private _globalStorage: GlobalStorageService) {}
}
