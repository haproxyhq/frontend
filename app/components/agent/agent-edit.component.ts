import {Component, Input, OnInit} from 'angular2/core';
import {RouteParams}          from 'angular2/router';

import {GlobalStorageService} from '../../services/general/global-storage.service';
import {AgentService}         from '../../services/agent/agent.service';

import {ConfigEditComponent}  from '../config/config-edit.component';

import {Agent}                from '../../models/wrapper/agent.model';
import {Completion}           from '../../models/wrapper/completion.model';

import {ProtectedDirective}   from '../../directives/general/protected.directive';

@Component({
  selector: 'agent-edit',
  templateUrl: './components/agent/agent-edit.component.html',
  styleUrls: ['./components/agent/agent-edit.component.css'],
  directives: [ProtectedDirective, ConfigEditComponent]
})
export class AgentEditComponent implements OnInit {

  private _agent: Agent = null;
  private _completion: Completion;
  private _types = ['global', 'defaults', 'listen', 'backend', 'frontend'];

  constructor(private _globalStorage: GlobalStorageService,
    private _agentService: AgentService,
    private _routeParams: RouteParams) {}

  ngOnInit() {
    let id = this._routeParams.get('id');
    this._agent = this._globalStorage.getAgent(id);
    if (this._agent !== null) {
      this._completion = this._globalStorage.getCompletion(this._agent.version);
      console.log(this._completion);
    }
  }
}
