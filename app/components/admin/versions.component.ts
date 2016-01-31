import {Component}   from 'angular2/core';
import {EventEmitter} from 'angular2/core';
import {OnDestroy} from 'angular2/core';
import {OnInit} from 'angular2/core';
import {Input} from 'angular2/core';
import {CompletionService} from '../../services/completion/completion.service';
import {Completion} from '../../models/wrapper/completion.model';
import {AbcIconComponent} from '../general/abc-icon.component';
import {GlobalStorageService} from '../../services/general/global-storage.service';

declare var $;

@Component({
  selector: 'versions-view',
  templateUrl: './components/admin/versions.component.html',
  styleUrls: ['./components/admin/versions.component.css'],
  directives: [AbcIconComponent]
})
export class VersionsComponent implements OnInit, OnDestroy {
  @Input() fabPressedEmitter: EventEmitter<string> = new EventEmitter<string>();

  public completions: Array<Completion> = [];
  public newCompletion: Completion = new Completion({});
  public parsingDocs: boolean = false;

  private _completionsLoaded = false;
  private _fabPressedSubscription: any;

  constructor(private _completionService: CompletionService, private _glogalStorageService: GlobalStorageService) { }

  ngOnInit(): void {
    this._fabPressedSubscription = this.fabPressedEmitter.subscribe((selectedTab) => {
      $('#add-completion-modal').modal('show');
    });
    this._completionService.getCompletions().subscribe((completions) => {
      this.completions = completions;
      this._completionsLoaded = true;
    });
  }

  ngOnDestroy(): void {
    this._fabPressedSubscription.unsubscribe();
  }

  public deleteCompletion(completion: Completion): void {
    var deletedCompletion: Completion = this.completions.splice(this.completions.indexOf(completion), 1)[0];
    this._completionService.deleteCompletion(deletedCompletion);
    this._glogalStorageService.completions = this.completions;
  }

  public onAddCompletionSubmit() {
    this.parsingDocs = true;
    this._completionService.addCompletionWithDocs(this.newCompletion).subscribe((completion) => {
      this.completions.push(completion);
      this._glogalStorageService.completions = this.completions;
      $('#add-completion-modal').modal('hide');
      this.parsingDocs = false;
    });
  }
}
