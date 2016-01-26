import {Component, OnInit}            from 'angular2/core';
import {Router}                       from 'angular2/router';

import {ProtectedDirective}           from '../../directives/general/protected.directive';

import {AgentDetailComponent}         from './agent-detail.component';

import {GlobalStorageService}         from '../../services/general/global-storage.service';
import {AgentService}                 from '../../services/agent/agent.service';
import {SchemaService}                from '../../services/schema/schema.service';

import {Agent}                        from '../../models/wrapper/agent.model';
import {ToastModel}                   from '../../models/toast.model';
import {Schema}                       from '../../models/wrapper/schema.model';

declare var $;

@Component({
  selector: 'agents',
  templateUrl: './components/agent/agents.component.html',
  styleUrls: ['./components/agent/agents.component.css'],
  directives: [ProtectedDirective, AgentDetailComponent]
})

export class AgentsComponent implements OnInit {
  public agents: Array<Agent> = [];
  public schemas: Array<Schema> = [];
  public selectedSchema: number = -1;
  public agentsLoaded: boolean = false;
  public schemasLoaded: boolean = false;
  public newAgent: Agent = new Agent({});

  public constructor(private _globalStorage: GlobalStorageService,
                     private _agentService: AgentService,
                     private _schemaService: SchemaService,
                     private _router: Router) {}

  public ngOnInit(): void {
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
  }

  public onAddAgentSubmit(): void {
    if(this.selectedSchema !== -1) {
      this.newAgent.configHolder = this.schemas[this.selectedSchema].configHolder;
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
}
