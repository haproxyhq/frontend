import {Component, Input}   from 'angular2/core';

import {Agent}              from '../../models/wrapper/agent.model';

import {AbcIconComponent}   from '../general/abc-icon.component';
import {AgentHeartbeatStatus} from '../../models/wrapper/agent-heartbeat-status.model';

@Component({
  selector: 'agent-detail',
  templateUrl: './components/agent/agent-detail.component.html',
  styleUrls: ['./components/agent/agent-detail.component.css'],
  directives: [AbcIconComponent]
})
export class AgentDetailComponent {
  @Input() agent: Agent;
  @Input() heartbeat: AgentHeartbeatStatus;
}
