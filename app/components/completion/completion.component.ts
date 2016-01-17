import {Component, Input, EventEmitter, Output} from 'angular2/core';

import {Completion}                             from '../../models/wrapper/completion.model';
import {CompletionSection}                      from '../../models/wrapper/completion-section.model';

import {FilterCompletionsPipe}                  from '../../pipes/completion/filter-completions.pipe';

@Component({
  selector: 'completion',
  templateUrl: './components/completion/completion.component.html',
  styleUrls: ['./components/completion/completion.component.css'],
  pipes: [FilterCompletionsPipe]
})

export class CompletionComponent {
  @Input() completion: Completion;
  @Input() search: string;
  @Output('selected-value') selectedValueEvent: EventEmitter<String> = new EventEmitter();

  constructor() {}

  moreClicked(event) {
    event.cancelBubble = true;
    this.selectedValueEvent.next(this.search);
  }
}
