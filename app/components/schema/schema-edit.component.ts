import {Component, Input, OnInit, EventEmitter, AfterViewInit} from 'angular2/core';
import {RouteParams}                from 'angular2/router';

import {GlobalStorageService}       from '../../services/general/global-storage.service';
import {RestoreService}             from '../../services/general/restore.service';
import {SchemaService}              from '../../services/schema/schema.service';

import {ConfigEditComponent}        from '../config/config-edit.component';
import {SaveCancelFabsComponent}    from '../general/save-cancel-fabs.component';
import {InputFieldComponent}        from '../general/input-field.component';

import {ToastModel}                 from '../../models/toast.model';
import {Schema}                     from '../../models/wrapper/schema.model';
import {Config}                     from '../../models/wrapper/config.model';
import {ConfigSection}              from '../../models/wrapper/config-section.model';
import {Completion}                 from '../../models/wrapper/completion.model';

import {ProtectedDirective}         from '../../directives/general/protected.directive';

declare var $;

@Component({
  selector: 'schema-edit',
  providers: [RestoreService],
  templateUrl: './components/schema/schema-edit.component.html',
  styleUrls: ['./components/schema/schema-edit.component.css'],
  directives: [ProtectedDirective, ConfigEditComponent, SaveCancelFabsComponent, InputFieldComponent]
})

export class SchemaEditComponent implements OnInit, AfterViewInit {

  private _configEmitter: EventEmitter<Config> = new EventEmitter();
  private _schema: Schema = null;
  private _completion: Completion;
  private _types = ['global', 'defaults', 'listen', 'backend', 'frontend'];
  private _restoring = false;
  private _avaiableVersions: Array<string> = [];

  constructor(private _globalStorage: GlobalStorageService,
    private _schemaService: SchemaService,
    private _routeParams: RouteParams,
    private _restoreService: RestoreService<Schema>) {}

  ngOnInit() {
    this._avaiableVersions = this._globalStorage.getAvailableCompletions();

    let id = this._routeParams.get('id');
    this._restoreService.setItem(this._globalStorage.getSchema(id));
    this._schema = this._restoreService.getItem();
    if (this._schema !== null) {
      this._completion = this._globalStorage.getCompletion(this._schema.version);
    }
  }

  ngAfterViewInit() {
    this._configEmitter.next(this._schema.configHolder);
  }

  /**
  * check if a section is empty
  * @return true if section is empty, false if section is not empty
  **/
  private _isEmptySection(section: ConfigSection) {
    return (section.section.name.trim() === '' && section.section.type.trim() === '' && section.values.length === 0);
  }

  /**
  * saves the edited schema
  **/
  private _saveChanges() {
    // filter an eventually null section (we add a null value to the section array for adding a blank section)
    this._schema.configHolder.config = this._schema.configHolder.config.filter((configSection, index, array) => {
      return configSection !== null && !this._isEmptySection(configSection);
    });
    // setting schema to the schema model again because the restore service causes it to be Object
    this._schema = new Schema(this._schema);
    this._schemaService.saveSchema(this._schema).subscribe(
      (schema) => {
        if (schema !== null) {
          $.snackbar(new ToastModel('Schema saved'));
        } else {
          $.snackbar(new ToastModel('Error saving Schema'));
        }
      }
    );
  }

  /**
  * resets all changes
  **/
  private _revertChanges() {
    this._schema = this._restoreService.reset();
    this._restoring = true;
    this._configEmitter.next(this._schema.configHolder);
  }

  /**
  * watches config changes from the child component
  **/
  private _configChange(config) {
    this._schema.configHolder = config;
  }

  /**
  * adds an empty section to the config
  **/
  private _addSection() {
    if (this._schema.configHolder === null) {
      let plainConfig = {
        config: []
      };
      this._schema.configHolder = new Config(plainConfig);
    }
    this._schema.configHolder.config.push(null);
    this._configEmitter.next(this._schema.configHolder);
  }
}
