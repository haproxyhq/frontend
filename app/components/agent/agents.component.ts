import {Component}            from 'angular2/core';

import {GlobalStorageService} from '../../services/general/global-storage.service';

import {ProtectedDirective}   from '../../directives/general/protected.directive';

import {AgentComponent}       from './agent-detail.component.ts';

import {Agent}                from '../../models/wrapper/agent.model';

var AGENTS: Array<Agent> = [
  new Agent({
    name: 'Agent 1',
    description: 'this is the first Agent',
    ip: '8.8.8.8',
    version: '1.6'
  }),
  new Agent({
    name: 'Agent 2',
    description: 'this is the second Agent',
    ip: '9.8.8.8',
    version: '1.6'
  }),
  new Agent({
    name: 'Agent 3',
    description: 'this is the third Agent',
    ip: '10.8.8.8',
    version: '1.5'
  })
];

@Component({
  selector: 'agents',
  templateUrl: './components/agent/agents.component.html',
  styleUrls: ['./components/agent/agents.component.css'],
  directives: [ProtectedDirective, AgentComponent]
})
export class AgentsComponent {
  public agents: Array<Agent> = AGENTS;

  constructor(private _globalStorage: GlobalStorageService) { }
}
