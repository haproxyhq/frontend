import {Component,ChangeDetectorRef, ChangeDetectionStrategy, Input, Output, OnInit, EventEmitter}  from 'angular2/core';

import {ConfigSectionComponent}       from './config-section.component';
import {InputFieldComponent}          from '../general/input-field.component';

import {GlobalStorageService}         from '../../services/general/global-storage.service';
import {CompletionService}            from '../../services/completion/completion.service';

import {ProtectedDirective}           from '../../directives/general/protected.directive';
import {UiSortableComponent}          from '../../directives/general/ui-sortable.directive';

import {Completion}                   from '../../models/wrapper/completion.model';
import {Config}                       from '../../models/wrapper/config.model';
import {ConfigSection}                from '../../models/wrapper/config-section.model';

@Component({
  selector: 'config-edit',
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './components/config/config-edit.component.html',
  styleUrls: ['./components/config/config-edit.component.css'],
  directives: [ProtectedDirective, UiSortableComponent, ConfigSectionComponent]
})

export class ConfigEditComponent implements OnInit {
  @Input() completion: Completion;
  @Input() types: Array<string>;
  @Input('config-emitter') configEmitter: EventEmitter<Config>;
  @Output() configChange = new EventEmitter();

  private _configSectionEmitter: Array<EventEmitter<ConfigSection>> = [];
  private _config: Config;

  private _sectionHelper: Array<number> = [];
  private _sections = {};

  private _sortableOptions: Object;

  constructor(private _ref: ChangeDetectorRef) {
    let that = this;
    this._sortableOptions = {
      /**
      * the callback stop function for the sortable action
      * @param e the event fired
      * @param s the sortable object
      **/
      stop: function(e, s): void {
        that.configChange.next(that._transformToConfig());
        that._ref.detectChanges();
      }
    };
  }

  ngOnInit() {
    this.configEmitter.subscribe((config) => {
      this._config = config;
      this._parseConfig();
      this._configSectionEmitter.forEach((emitter, index, array) => {
        emitter.next(this._sections[this._sectionHelper[index]]);
      });
    });
  }

  /**
  * react to a value change in an input
  **/
  private _sectionChange(key, value) {
    this._sections[key] = value;
    this.configChange.next(this._transformToConfig());
    this._ref.detectChanges();
  }

  /**
  * transforms the plain object to an config object
  * @return returns a new Config instance
  **/
  private _transformToConfig(): Config {
    let plainConfig = {
      config: []
    };
    this._sectionHelper.forEach((key) => {
      plainConfig.config.push(this._sections[key]);
    });
    return new Config(plainConfig);
  }

  /**
  * parses the @Input() emittet config to the internal structure
  **/
  private _parseConfig() {
    if (this._config !== null) {
      this._sectionHelper = [];
      this._sections = {};
      this._configSectionEmitter = [];
      this._config.config.forEach((section, index, array) => {
        this._sectionHelper.push(index);
        this._sections[index] = section;
        this._configSectionEmitter.push(new EventEmitter());
      });
      this._ref.detectChanges();
    }
  }
}
