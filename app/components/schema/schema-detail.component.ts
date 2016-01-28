import {Component, Input}   from 'angular2/core';

import {Schema}              from '../../models/wrapper/schema.model';

import {AbcIconComponent}   from '../general/abc-icon.component';

@Component({
  selector: 'schema-detail',
  templateUrl: './components/schema/schema-detail.component.html',
  styleUrls: ['./components/schema/schema-detail.component.css'],
  directives: [AbcIconComponent]
})
export class SchemaDetailComponent {
  @Input() schema: Schema;
}
