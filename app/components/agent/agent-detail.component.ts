import {Component, Input}            from 'angular2/core';

import {Agent} from '../../models/wrapper/agent.model';

@Component({
  selector: 'agent-detail',
  templateUrl: './components/agent/agent-detail.component.html',
  styleUrls: ['./components/agent/agent-detail.component.css'],
})
export class AgentDetailComponent {
  @Input() agent: Agent;

  constructor() {}
}
