import {Component, Input} from 'angular2/core';

@Component({
  selector: 'abc-icon',
  templateUrl: './components/general/abc-icon.component.html',
  styleUrls: ['./components/general/abc-icon.component.css']
})

export class AbcIconComponent {
  @Input() iconText: string;
}
