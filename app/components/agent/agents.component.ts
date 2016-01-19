import {Component, OnInit}            from 'angular2/core';

import {ProtectedDirective}   from '../../directives/general/protected.directive';

import {AgentDetailComponent}       from './agent-detail.component';
import {Agent} from '../../models/wrapper/agent.model';
import {AgentService} from '../../services/agent/agent.service';

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
  directives: [ProtectedDirective, AgentDetailComponent]
})
export class AgentsComponent implements OnInit{
  public agents: Array<Agent> = AGENTS;

  constructor(private _agentService: AgentService) {

  }

  ngOnInit(): void {
    //console.log(this._agentService.getAgents());
  }
}
