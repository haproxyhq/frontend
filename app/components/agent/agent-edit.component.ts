import {Component, Input, OnInit, EventEmitter, AfterViewInit} from 'angular2/core';
import {RouteParams}                from 'angular2/router';

import {GlobalStorageService}       from '../../services/general/global-storage.service';
import {RestoreService}             from '../../services/general/restore.service';
import {AgentService}               from '../../services/agent/agent.service';

import {ConfigEditComponent}        from '../config/config-edit.component';
import {SaveCancelFabsComponent}    from '../general/save-cancel-fabs.component';
import {InputFieldComponent}        from '../general/input-field.component';

import {ToastModel}                 from '../../models/toast.model';
import {Agent}                      from '../../models/wrapper/agent.model';
import {Config}                     from '../../models/wrapper/config.model';
import {Completion}                 from '../../models/wrapper/completion.model';

import {ProtectedDirective}         from '../../directives/general/protected.directive';

declare var $;

@Component({
  selector: 'agent-edit',
  providers: [RestoreService],
  templateUrl: './components/agent/agent-edit.component.html',
  styleUrls: ['./components/agent/agent-edit.component.css'],
  directives: [ProtectedDirective, ConfigEditComponent, SaveCancelFabsComponent, InputFieldComponent]
})

export class AgentEditComponent implements OnInit, AfterViewInit {

  private _configEmitter: EventEmitter<Config> = new EventEmitter();
  private _agent: Agent = null;
  private _completion: Completion;
  private _types = ['global', 'defaults', 'listen', 'backend', 'frontend'];

  constructor(private _globalStorage: GlobalStorageService,
    private _agentService: AgentService,
    private _routeParams: RouteParams,
    private _restoreService: RestoreService<Agent>) {}

  ngOnInit() {
    let id = this._routeParams.get('id');
    this._restoreService.setItem(this._globalStorage.getAgent(id));
    this._agent = this._restoreService.getItem();
    if (this._agent !== null) {
      this._completion = this._globalStorage.getCompletion(this._agent.version);
    }
  }

  ngAfterViewInit() {
    this._configEmitter.next(this._agent.configHolder);
  }

  /**
  * saves the edited agent
  **/
  private _saveChanges() {
    // filter an eventually null section (we add a null value to the section array for adding a blank section)
    this._agent.configHolder.config = this._agent.configHolder.config.filter((configSection, index, array) => {
      return configSection !== null;
    });
    // setting agent to the agent model again because the restore service causes it to be Object
    this._agent = new Agent(this._agent);
    this._agentService.saveAgent(this._agent).subscribe(
      (agent) => {
        if (agent !== null) {
          $.snackbar(new ToastModel('Agent saved'));
        } else {
          $.snackbar(new ToastModel('Error saving agent'));
        }
      }
    );
  }

  /**
  * resets all changes
  **/
  private _revertChanges() {
    this._agent = this._restoreService.reset();//this._config;
    this._configEmitter.next(this._agent.configHolder);
  }

  /**
  * watches config changes from the child component
  **/
  private _configChange(config) {
    this._agent.configHolder = config;
  }

  /**
  * adds an empty section to the config
  **/
  private _addSection() {
    if (this._agent.configHolder === null) {
      let plainConfig = {
        config: [
        ]
      };
      this._agent.configHolder = new Config(plainConfig);
    }
    this._agent.configHolder.config.push(null);
    this._configEmitter.next(this._agent.configHolder);
  }
}
