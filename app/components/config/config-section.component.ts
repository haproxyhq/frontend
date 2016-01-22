import {Component,ChangeDetectorRef, ChangeDetectionStrategy, Input}  from 'angular2/core';

import {InputFieldComponent}          from '../general/input-field.component';

import {GlobalStorageService}         from '../../services/general/global-storage.service';
import {CompletionService}            from '../../services/completion/completion.service';

import {ProtectedDirective}           from '../../directives/general/protected.directive';
import {UiSortableComponent}          from '../../directives/general/ui-sortable.directive';

import {Completion}                   from '../../models/wrapper/completion.model';
import {ConfigSection}                from '../../models/wrapper/config-section.model';
import {Config}                       from '../../models/wrapper/config.model';

@Component({
  selector: 'config-section',
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './components/config/config-section.component.html',
  styleUrls: ['./components/config/config-section.component.css'],
  directives: [ProtectedDirective, UiSortableComponent, InputFieldComponent]
})

export class ConfigSectionComponent {
  @Input() config: Config;

  private _completion: Completion;
  private _valueStrings: Array<number> = [0];
  private _values = {
    0: ''
  };
  private _type: string;
  private _name: string = '';

  private _sortableOptions: Object;

  constructor(private _ref: ChangeDetectorRef, private _globalStorage: GlobalStorageService) {
    this._completion = this._globalStorage.completions[0];
    let that = this;
    this._sortableOptions = {
      /**
      * the callback stop function for the sortable action
      * @param e the event fired
      * @param s the sortable object
      **/
      stop: function(e, s): void {
        that._valueStrings.forEach((elem, index, array) => {
          if (index !== (array.length - 1)) that._removeFieldIfEmpty(index);
        });
        if (that._values[that._valueStrings.slice(-1)[0]] !== '') that._addBlankField();
        that._ref.detectChanges();
      }
    };
  }

  /**
  * adds a new blank field, if the focused input is the last one
  * @param i the index of the focused input
  **/
  private _onFocusChange(i: number): void {
    let key = this._valueStrings[i];
    if (key === this._valueStrings.slice(-1)[0]) {
      this._addBlankField();
    }
  }

  /**
  * removes the field if it is empty
  * @param i the index of the
  **/
  private _onBlurChange(i: number): void {
    this._removeFieldIfEmpty(i);
  }

  /**
  * removes the specific item
  * @param i the index of the key in the _valueStrings array
  **/
  private _removeField(i: number): void {
    let key = this._valueStrings[i];
    this._valueStrings.splice(i, 1);
    delete this._values[key];
  }

  /**
  * removes the specific item if the value for the key at this index is empty
  * @param i the index of the element in _valueStrings to check
  **/
  private _removeFieldIfEmpty(i: number): void {
    let key = this._valueStrings[i];
    if (this._values[key] === '') {
      this._removeField(i);
    }
  }

  /**
  * adds a blank value to the end of the list
  **/
  private _addBlankField(): void {
    let sortedCopy = JSON.parse(JSON.stringify(this._valueStrings)).sort();
    let key = sortedCopy.slice(-1)[0];
    this._values[key + 1] = '';
    this._valueStrings.push(key + 1);
  }

  /**
  * transforms the plain value object to an config object
  * @return returns a new Config instance
  **/
  private _transformToConfig(): Config {
    let plainConfig = {
      section: {},
      values: []
    };
    this._valueStrings.forEach((key) => {
      plainConfig.values.push(this._values[key]);
    });
    plainConfig.section = new ConfigSection(this._name, this._type);
    return new Config(plainConfig);
  }

  /**
  * parses the @Input() field to the internal structure
  **/
  private _parseConfig() {
    if (this.config !== null) {
      this.config.values.forEach((value, index, array) => {
        this._valueStrings.push(index);
        this._values[index] = value;
      });
      this._name = this.config.section.name;
      this._type = this.config.section.type;
    }
  }
}
