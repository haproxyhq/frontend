import {Component}            from 'angular2/core';

import {GlobalStorageService} from '../../services/general/global-storage.service';

import {ProtectedDirective}   from '../../directives/general/protected.directive';

@Component({
  selector: 'concepts',
  templateUrl: './components/concept/concepts.component.html',
  styleUrls: ['./components/concept/concepts.component.css'],
  directives: [ProtectedDirective]
})

export class ConceptsComponent {
  constructor(private _globalStorage: GlobalStorageService) {}
}
