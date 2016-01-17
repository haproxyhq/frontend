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

  constructor() {}

  updateValue(value) {
    this.valueChange.next(value);
  }

  showCompletion(): boolean {
    return this.completion !== undefined && this.completion !== null;
  }

  toggleCompletion() {
    return this._showCompletion = !this._showCompletion;
  }
}
