import {Component,ChangeDetectorRef, ChangeDetectionStrategy, Input, Output, EventEmitter}  from 'angular2/core';

import {InputFieldComponent}          from '../general/input-field.component';

import {GlobalStorageService}         from '../../services/general/global-storage.service';
import {CompletionService}            from '../../services/completion/completion.service';

import {ProtectedDirective}           from '../../directives/general/protected.directive';
import {UiSortableComponent}          from '../../directives/general/ui-sortable.directive';

import {Completion}                   from '../../models/wrapper/completion.model';
import {ConfigSection}                from '../../models/wrapper/config-section.model';
import {ConfigTypeSection}            from '../../models/wrapper/config-type-section.model';

declare var $;

@Component({
  selector: 'config-section',
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './components/config/config-section.component.html',
  styleUrls: ['./components/config/config-section.component.css'],
  directives: [ProtectedDirective, UiSortableComponent, InputFieldComponent]
})

export class ConfigSectionComponent {
  @Input() completion: Completion;
  @Input() types: Array<string>;
  @Input('section') set configSection(configSection: ConfigSection) {
    this._configSection = configSection;
    this._parseConfigSection();
  }
  @Output('sectionChange') configSectionEvent = new EventEmitter();
  @Output('section««') configSectionDelete = new EventEmitter();

  private _configSection: ConfigSection;

  private _valueStrings: Array<number> = [0];
  private _values = {
    0: ''
  };
  private _type: string = '';
  private _name: string = '';

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
        that._valueStrings.forEach((elem, index, array) => {
          if (index !== (array.length - 1)) that._removeFieldIfEmpty(elem);
        });
        if (that._values[that._valueStrings.slice(-1)[0]] !== '') that._addBlankField();
        that.configSectionEvent.next(that._transformToConfigSection());
        that._ref.detectChanges();
      }
    };
  }

  /**
  * toggles the panel body
  * Information: need to do this with jQuery because bootstrap always selects the first instance of config-section
  **/
  private _toggleCollapse(parentDiv) {
    $(parentDiv).find('.collapse').collapse('toggle');
  }

  /**
  * adds a new blank field, if the focused input is the last one
  * @param i the index of the focused input
  **/
  private _onFocusChange(key: number): void {
    if (key === this._valueStrings.slice(-1)[0]) {
      this._addBlankField();
    }
  }

  /**
  * react to a value change
  **/
  private _valueChange(fieldKey, value) {
    this[fieldKey] = value;
    this.configSectionEvent.next(this._transformToConfigSection());
  }

  /**
  * react to a value change in an input
  **/
  private _inputChange(key, value) {
    this._values[key] = value;
    this.configSectionEvent.next(this._transformToConfigSection());
  }

  /**
  * removes the field if it is empty
  * @param i the index of the
  **/
  private _onBlurChange(key: number): void {
    this._removeFieldIfEmpty(key);
  }

  /**
  * removes the specific item
  * @param i the index of the key in the _valueStrings array
  **/
  private _removeField(key: number): void {
    var i = this._valueStrings.indexOf(key, 0);
    this._valueStrings.splice(i, 1);
    delete this._values[key];
    this.configSectionEvent.next(this._transformToConfigSection());
  }

  /**
  * removes the specific item if the value for the key at this index is empty
  * @param i the index of the element in _valueStrings to check
  **/
  private _removeFieldIfEmpty(key: number): void {
    if ((this._valueStrings.length - 1) !== this._valueStrings.indexOf(key)) {
      if (this._values[key] === '') {
        this._removeField(key);
      }
    }
  }

  private _removeSection() {
    this.configSectionDelete.next(true);
  }

  /**
  * adds a blank value to the end of the list
  **/
  private _addBlankField(): void {
    let sortedCopy = JSON.parse(JSON.stringify(this._valueStrings)).sort((a,b) => {
      return a - b;
    });
    let key = sortedCopy.slice(-1)[0];
    this._values[key + 1] = '';
    this._valueStrings.push(key + 1);
  }

  /**
  * transforms the plain value object to an config section object
  * @return returns a new ConfigSection instance
  **/
  private _transformToConfigSection(): ConfigSection {
    let plainConfig = {
      section: {
        name: '',
        type: ''
      },
      values: []
    };
    this._valueStrings.forEach((key) => {
      if (this._values[key] !== '') {
        plainConfig.values.push(this._values[key]);
      }
    });
    plainConfig.section.name = this._name;
    plainConfig.section.type = this._type;
    return new ConfigSection(plainConfig);
  }

  /**
  * parses the @Input() field to the internal structure
  **/
  private _parseConfigSection() {
    if (this._configSection !== null && this._configSection !== undefined) {
      this._valueStrings = [];
      if (this._configSection.values.length === 0) {
        this._valueStrings = [0];
        this._values = { 0: '' };
      }
      this._configSection.values.forEach((value, index, array) => {
        this._valueStrings.push(index);
        this._values[index] = value;
      });
      this._name = this._configSection.section.name;
      this._type = this._configSection.section.type;
      if (this._configSection.values.length !== 0) this._addBlankField();
    }
  }
}
