import {Component, Input, EventEmitter, Output, OnInit} from 'angular2/core';

import {Completion}                             from '../../models/wrapper/completion.model';
import {CompletionSection}                      from '../../models/wrapper/completion-section.model';

import {FilterCompletionsPipe}                  from '../../pipes/completion/filter-completions.pipe';

@Component({
  selector: 'completion',
  templateUrl: './components/completion/completion.component.html',
  styleUrls: ['./components/completion/completion.component.css'],
  pipes: [FilterCompletionsPipe]
})

export class CompletionComponent implements OnInit {
  @Input() completion: Completion;
  @Input() search: string;
  @Input('key-code') keyCode: EventEmitter<number>;
  @Output('selected-value') selectedValueEvent: EventEmitter<String> = new EventEmitter();

  private _selected: number = -1;
  private _filterCompletionsPipe: FilterCompletionsPipe = new FilterCompletionsPipe();
  private _filtered;

  ngOnInit() {
    this._filtered = this._filterCompletionsPipe.transform(this.completion.data, [this.search]);

    this.keyCode.subscribe(
      (code) => {
        this._filtered = this._filterCompletionsPipe.transform(this.completion.data, [this.search]);

        if (code === 38) {
          if (this._selected > -1) {
            this._selected = this._selected - 1;
          }
        } else if (code === 40) {
          if (this._selected === this._filtered.length - 1) {
            this._selected = 0;
          } else this._selected = this._selected + 1;
        } else if (code === 13) {
          if (this._selected !== -1 && this._selected < this._filtered.length) {
            this.selectedValueEvent.next(this._filtered[this._selected].keyword);
            this.search = this._filtered[this._selected].keyword;
            this._filtered = this._filterCompletionsPipe.transform(this.completion.data, [this.search]);
            this._selected = -1;
          }
        } else {
          this._selected = -1;
        }
      }
    );
  }

  constructor() {}

  moreClicked(event) {
    event.cancelBubble = true;
    this.selectedValueEvent.next(this.search);
  }
}
