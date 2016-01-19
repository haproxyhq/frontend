import {Component, Input} from 'angular2/core';

@Component({
  selector: 'abc-icon',
  templateUrl: './components/abc-icon/abc-icon.component.html',
  styleUrls: ['./components/abc-icon/abc-icon.component.css']
})

export class AbcIconComponent {
  @Input() iconText: string;
}
