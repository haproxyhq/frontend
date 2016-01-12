import {Component, Input, Output, EventEmitter} from 'angular2/core';

@Component({
  selector: 'input-field',
  templateUrl: './components/general/input-field.component.html',
  styleUrls: ['./components/general/input-field.component.css']
})

export class InputFieldComponent {
  @Input() label: string;
  @Input() value: string;
  @Output() valueChange = new EventEmitter();

  constructor() {}

  updateValue(value) {
    this.valueChange.next(value);
  }
}
