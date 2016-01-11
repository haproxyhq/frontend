import {Component}            from 'angular2/core';

import {GlobalStorageService} from '../../services/general/global-storage.service';

@Component({
  selector: 'concepts',
  templateUrl: './components/concept/concepts.component.html',
  styleUrls: ['./components/concept/concepts.component.css']
})

export class ConceptsComponent {
  constructor(private _globalStorage: GlobalStorageService) {}
}
