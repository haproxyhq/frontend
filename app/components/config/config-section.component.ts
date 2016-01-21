import {Component,ChangeDetectorRef, ChangeDetectionStrategy}  from 'angular2/core';

import {InputFieldComponent}          from '../general/input-field.component';

import {GlobalStorageService}         from '../../services/general/global-storage.service';
import {CompletionService}            from '../../services/completion/completion.service';

import {ProtectedDirective}           from '../../directives/general/protected.directive';
import {UiSortableComponent}          from '../../directives/general/ui-sortable.directive';

import {Completion}                   from '../../models/wrapper/completion.model';

@Component({
  selector: 'config-section',
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './components/config/config-section.component.html',
  styleUrls: ['./components/config/config-section.component.css'],
  directives: [ProtectedDirective, UiSortableComponent, InputFieldComponent]
})

export class ConfigSectionComponent {
  private _completion: Completion;
  private _valueStrings: Array<string> = ['value0'];
  private _values = {
    value0: ''
  };

  private _sortableOptions: Object;

  constructor(private _ref: ChangeDetectorRef, private _globalStorage: GlobalStorageService) {
    this._completion = this._globalStorage.completions[0];
    let that = this;
    this._sortableOptions = {
      stop: function(e, v) {
        that._ref.detectChanges();
      }
    };
  }

  private _onFocusChange(index) {
    if (index === this._valueStrings.length - 1) {
      this._values['value' + (index + 1)] = '';
      this._valueStrings.push('value' + (index + 1));
    }
  }

  private _onBlurChange(index) {
    console.log('hier' + index);
  }
}
