import {Component, Input, EventEmitter, Output, OnInit} from 'angular2/core';

import {Completion}                                     from '../../models/wrapper/completion.model';
import {CompletionSection}                              from '../../models/wrapper/completion-section.model';

import {FilterCompletionsPipe}                          from '../../pipes/completion/filter-completions.pipe';

@Component({
  selector: 'completion',
  templateUrl: './components/completion/completion.component.html',
  styleUrls: ['./components/completion/completion.component.css']
})

export class CompletionComponent implements OnInit {
  @Input() completion: Completion;
  @Input() search: string;
  @Input('key-code') keyCode: EventEmitter<number>;
  @Input('max-result-count') defaultResultCount: number = 10;
  @Output('selected-value') selectedValueEvent: EventEmitter<String> = new EventEmitter();

  private _resultCount: number = +this.defaultResultCount;
  private _selected: number = -1;
  private _filterCompletionsPipe: FilterCompletionsPipe = new FilterCompletionsPipe();
  private _preFiltered: Array<CompletionSection>;
  private _filtered: Array<CompletionSection>;
  private _keySelection: boolean = false;
  private _resetScroll: boolean = false;

  constructor() {}

  ngOnInit() {
    this._setFiltered();

    this.keyCode.subscribe(
      (code) => {
        if (code === 38) {
          this._keyUpPressed();
        } else if (code === 40) {
          this._keyDownPressed();
        } else if (code === 13) {
          this._enterPressed();
        } else {
          this._setFiltered();
          this._resetScroll = true;
          this._selected = -1;
        }
      }
    );
  }

  private _keyUpPressed() {
    this._setFiltered(false);
    if (this._selected > -1) {
      this._selected = this._selected - 1;
      this._keySelection = true;
    }
  }

  private _keyDownPressed() {
    this._setFiltered(false);
    if (this._selected === this._getListLength()) {
      this._selected = 0;
    } else {
      this._selected = this._selected + 1;
    }
    this._keySelection = true;
  }

  private _enterPressed() {
    if (this._selected !== -1 && this._selected < this._filtered.length) {
      this.selectedValueEvent.next(this._filtered[this._selected].keyword);
      this.search = this._filtered[this._selected].keyword;
      this._setFiltered();
      this._selected = -1;
    } else if (this._selected === this._filtered.length) {
      this._loadMoreResults();
    }
  }

  private _getListLength(): number {
    if (this._showMoreResults()) return this._filtered.length;
    return this._filtered.length - 1;
  }

  private _showMoreResults() {
    return this._resultCount < (this._preFiltered.length - 1);
  }

  private _loadMoreResults() {
    this._resultCount += +this.defaultResultCount;
    if (this._resultCount >= this._preFiltered.length) this._resultCount = this._preFiltered.length - 1;
    this._setFiltered(false);
    this.selectedValueEvent.next(this.search);
  }

  private _setFiltered(reset: boolean = true) {
    if (reset) this._resultCount = +this.defaultResultCount;
    this._preFiltered = this._filterCompletionsPipe.transform(this.completion.data, [this.search]);
    this._filtered = this._preFiltered.slice(0, this._resultCount);
  }

  private _setSelectedItem(index, liItem) {
    if (this._selected === -1 && this._resetScroll) {
      liItem.parentElement.scrollTop = 0;
      this._resetScroll = false;
    }
    if (this._selected === index) {
      let newScroll = liItem.offsetTop - liItem.parentElement.clientHeight + liItem.scrollHeight;
      if (this._keySelection) {
        liItem.parentElement.scrollTop = newScroll;
        this._keySelection = false;
      }
      return true;
    }
    return false;
  }

  private _setSelectedItemMouse(index, event) {
    if (event.movementX !== 0 || event.movementY !== 0) {
      this._selected = index;
    }
  }

  private _mouseSelectKeyword(value: string) {
    this.search = value;
    this._filtered = this._filterCompletionsPipe.transform(this.completion.data, [value]);
    this.selectedValueEvent.next(value);
  }

  private _moreClicked(event) {
    event.cancelBubble = true;
    this.selectedValueEvent.next(this.search);
  }
}
