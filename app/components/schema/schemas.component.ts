import {Component}            from 'angular2/core';

import {GlobalStorageService} from '../../services/general/global-storage.service';

import {ProtectedDirective}   from '../../directives/general/protected.directive';

@Component({
  selector: 'schemas',
  templateUrl: './components/schema/schemas.component.html',
  styleUrls: ['./components/schema/schemas.component.css'],
  directives: [ProtectedDirective]
})

export class SchemasComponent {
  constructor(private _globalStorage: GlobalStorageService) {}
}
