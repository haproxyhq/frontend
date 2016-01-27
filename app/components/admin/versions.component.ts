import {Component}   from 'angular2/core';
import {EventEmitter} from 'angular2/core';
import {OnDestroy} from 'angular2/core';
import {OnInit} from 'angular2/core';
import {Input} from 'angular2/core';
import {CompletionService} from '../../services/completion/completion.service';
import {Completion} from '../../models/wrapper/completion.model';
import {AbcIconComponent} from '../general/abc-icon.component';

declare var $;

@Component({
  selector: 'versions-view',
  templateUrl: './components/admin/versions.component.html',
  styleUrls: ['./components/admin/versions.component.css'],
  directives: [AbcIconComponent]
})
export class VersionsComponent implements OnInit, OnDestroy {
  @Input() fabPressedEmitter: EventEmitter<string> = new EventEmitter<string>();

  public completions: Array<Completion>;
  public newCompletion: Completion = new Completion({});
  public parsingDocs: boolean = false;

  private _fabPressedSubscription: any;

  constructor(private _completionService: CompletionService) { }

  ngOnInit(): void {
    this._fabPressedSubscription = this.fabPressedEmitter.subscribe((selectedTab) => {
      $('#add-completion-modal').modal('show');
    });
    this._completionService.getCompletions().subscribe((completions) => {
      this.completions = completions;
    });
  }

  ngOnDestroy(): void {
    this._fabPressedSubscription.unsubscribe();
  }

  public deleteCompletion(completion: Completion): void {
    this.completions.splice(this.completions.indexOf(completion));

    console.log(this.completions);
  }

  public onAddCompletionSubmit() {
    this.parsingDocs = true;
  }
}
