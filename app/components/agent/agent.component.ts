import {Component}            from 'angular2/core';

import {GlobalStorageService} from '../../services/general/global-storage.service';

import {Agent} from '../../models/wrapper/agent.model.ts';

@Component({
  selector: 'agent',
  templateUrl: './components/agent/agent.component.html',
  styleUrls: ['./components/agent/agent.component.css'],
  inputs: ['agent']
})
export class AgentComponent {
  constructor(private _globalStorage: GlobalStorageService) {}
}
