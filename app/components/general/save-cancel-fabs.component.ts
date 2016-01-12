import {Component, Output, EventEmitter} from 'angular2/core';

@Component({
  selector: 'save-cancel-fabs',
  templateUrl: './components/general/save-cancel-fabs.component.html',
  styleUrls: ['./components/general/save-cancel-fabs.component.css']
})

export class SaveCancelFabsComponent {
  @Output() save = new EventEmitter();
  @Output() cancel = new EventEmitter();

  constructor() {}

  saveClicked() {
    this.save.next(true);
  }

  cancelClicked() {
    this.cancel.next(true);
  }
}
