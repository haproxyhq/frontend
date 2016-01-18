import {Component, Input, Output, EventEmitter} from 'angular2/core';

import {CompletionComponent}                    from '../completion/completion.component';
import {Completion}                             from '../../models/wrapper/completion.model';

@Component({
  selector: 'input-field',
  templateUrl: './components/general/input-field.component.html',
  styleUrls: ['./components/general/input-field.component.css'],
  directives: [CompletionComponent]
})

export class InputFieldComponent {
  @Input() label: string;
  @Input() value: string;
  @Input() required: boolean = false;
  @Input('completion-data') completion: Completion;
  @Output() valueChange = new EventEmitter();

  private _showCompletion = false;
  private _blurEnabled = true;
  private _keyCode: EventEmitter<number> = new EventEmitter();

  constructor() {}

  updateValue(value: string) {
    this.valueChange.next(value);
  }

  showCompletion(): boolean {
    return this.completion !== undefined && this.completion !== null;
  }

  toggleBlur(value: boolean) {
    this._blurEnabled = value;
  }

  toggleCompletion(value: boolean) {
    if (this._blurEnabled) this._showCompletion = value;
  }

  handleSelectedValueChange(value, input) {
    this.updateValue(value);
    input.focus();
  }

  onKeyDown(event) {
    if (event.keyCode === 38 || event.keyCode === 40) {
      event.preventDefault();
    }
  }

}
