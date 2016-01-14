import {Component, Input}       from 'angular2/core';

import {Completion}             from '../../models/wrapper/completion.model';
import {CompletionSection}      from '../../models/wrapper/completion-section.model';

import {FilterCompletionsPipe}  from '../../pipes/completion/filter-completions.pipe';

@Component({
  selector: 'completion',
  templateUrl: './components/completion/completion.component.html',
  styleUrls: ['./components/completion/completion.component.css'],
  pipes: [FilterCompletionsPipe]
})

export class CompletionComponent {
  @Input() completion: Completion;
  @Input() search: string;

  constructor() {}

}
