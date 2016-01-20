import {Component, OnInit}            from 'angular2/core';

import {ProtectedDirective}   from '../../directives/general/protected.directive';

import {AgentDetailComponent}       from './agent-detail.component';
import {Agent} from '../../models/wrapper/agent.model';
import {AgentService} from '../../services/agent/agent.service';

@Component({
  selector: 'agents',
  templateUrl: './components/agent/agents.component.html',
  styleUrls: ['./components/agent/agents.component.css'],
  directives: [ProtectedDirective, AgentDetailComponent]
})
export class AgentsComponent implements OnInit {
  public agents: Array<Agent> = [];
  public agentsLoaded: boolean = false;
  public newAgent: Agent = new Agent({});

  public constructor(private _agentService: AgentService) {}

  public ngOnInit(): void {
    this._agentService.getAgents().subscribe((agents) => {
      this.agents = agents;
      this.agentsLoaded = true;
    });
  }

  public onAddAgentSubmit(): void {
    this._agentService.addAgent(this.newAgent).subscribe((agent) => {
      this.agents.push(agent);
      $('#add-agent-modal').modal('hide');
      this.newAgent = new Agent({});
    });
  }
}
