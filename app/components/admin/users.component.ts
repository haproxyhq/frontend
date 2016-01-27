import {Component}   from 'angular2/core';
import {OnInit} from 'angular2/core';
import {OnDestroy} from 'angular2/core';
import {EventEmitter} from 'angular2/core';
import {Input} from 'angular2/core';

@Component({
  selector: 'users-view',
  templateUrl: './components/admin/users.component.html',
  styleUrls: ['./components/admin/users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {
  @Input() fabPressedEmitter: EventEmitter<string> = new EventEmitter<string>();

  private _fabPressedSubscription: any;

  ngOnInit(): void {
    this._fabPressedSubscription = this.fabPressedEmitter.subscribe((selectedTab) => {
      console.log(selectedTab);
    });
  }

  ngOnDestroy(): void {
    this._fabPressedSubscription.unsubscribe();
  }
}
