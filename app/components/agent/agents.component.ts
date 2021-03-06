import {Component, OnInit, EventEmitter}            from 'angular2/core';
import {Router}                                     from 'angular2/router';

import {ProtectedDirective}                         from '../../directives/general/protected.directive';

import {AgentDetailComponent}                       from './agent-detail.component';

import {GlobalStorageService}                       from '../../services/general/global-storage.service';
import {AgentService}                               from '../../services/agent/agent.service';
import {SchemaService}                              from '../../services/schema/schema.service';

import {Agent}                                      from '../../models/wrapper/agent.model';
import {ToastModel}                                 from '../../models/toast.model';
import {Schema}                                     from '../../models/wrapper/schema.model';
import {HeartbeatService}                           from '../../services/agent/heartbeat.service';
import {AgentHeartbeatStatus}                       from '../../models/wrapper/agent-heartbeat-status.model';
import {OnDestroy}                                  from 'angular2/core';

declare var $;

@Component({
  selector: 'agents',
  templateUrl: './components/agent/agents.component.html',
  styleUrls: ['./components/agent/agents.component.css'],
  directives: [ProtectedDirective, AgentDetailComponent]
})

export class AgentsComponent implements OnInit, OnDestroy {
  public agents: Array<Agent> = [];
  public schemas: Array<Schema> = [];
  public selectedSchema: number = -1;
  public agentsHeartbeats: Map<string, AgentHeartbeatStatus> = new Map<string, AgentHeartbeatStatus>();
  public agentsLoaded: boolean = false;
  public schemasLoaded: boolean = false;
  public heartbeatsLoaded: boolean = false;
  public newAgent: Agent = new Agent({});

  private _avaiableVersions: Array<string> = [];

  public constructor(private _globalStorage: GlobalStorageService,
                     private _agentService: AgentService,
                     private _schemaService: SchemaService,
                     private _heartbeatService: HeartbeatService,
                     private _router: Router) {}

  public ngOnInit(): void {
    this._avaiableVersions = this._globalStorage.getAvailableCompletions();
    this._agentService.getAgents().subscribe((agents) => {
      this.agents = agents;
      this._globalStorage.agents = this.agents;
      if (this.agents !== null) {
        this.agentsLoaded = true;
      } else {
        $.snackbar(new ToastModel('Loading Agents failed'));
      }
    });
    this._schemaService.getSchemas().subscribe((schemas) => {
      this.schemas = schemas;
      this._globalStorage.schemas = this.schemas;
      if (this.schemas !== null) {
        this.schemasLoaded = true;
      } else {
        $.snackbar(new ToastModel('Loading Schemas failed'));
      }
    });
    this._heartbeatService.startHeartbeatPolling().subscribe((heartbeats: Map<string, AgentHeartbeatStatus>) => {
      this.agentsHeartbeats = heartbeats;
      this.heartbeatsLoaded = true;
    });
  }

  public ngOnDestroy(): void {
    this._heartbeatService.stopHeartbeatPolling();
  }

  public onAddAgentSubmit(): void {
    if(this.selectedSchema !== -1) {
      this.newAgent.configHolder = this.schemas[this.selectedSchema].configHolder;
      this.newAgent.version = this.schemas[this.selectedSchema].version;
    } else {
      this.newAgent.configHolder = null;
    }
    this._agentService.addAgent(this.newAgent).subscribe((agent) => {
      this.agents.push(agent);
      this._globalStorage.agents = this.agents;
      $('#add-agent-modal').modal('hide');
      this.newAgent = new Agent({});
    });
  }

  private _selectAgent(id: string) {
    this._router.navigate(['Agent Edit', { id: id }]);
  }

  private _deleteAgent(agent: Agent): void {
    this._agentService.deleteAgent(agent).subscribe((res) => {
      if (res) {
        this.agents.splice(this.agents.indexOf(agent), 1);
        this._globalStorage.agents = this.agents;
        $.snackbar(new ToastModel('Agent deleted'));
      } else $.snackbar(new ToastModel('Error deleting agent'));
    });
  }
}
