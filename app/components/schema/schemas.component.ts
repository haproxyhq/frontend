import {Component, OnInit}      from 'angular2/core';
import {Router}                 from 'angular2/router';

import {GlobalStorageService}   from '../../services/general/global-storage.service';
import {SchemaService}          from '../../services/schema/schema.service';

import {Schema}                 from '../../models/wrapper/schema.model';
import {ToastModel}             from '../../models/toast.model';

import {SchemaDetailComponent}  from './schema-detail.component';

import {ProtectedDirective}     from '../../directives/general/protected.directive';

declare var $;

@Component({
  selector: 'schemas',
  templateUrl: './components/schema/schemas.component.html',
  styleUrls: ['./components/schema/schemas.component.css'],
  directives: [ProtectedDirective, SchemaDetailComponent]
})

export class SchemasComponent implements OnInit {
  private _schemas: Array<Schema> = [];
  private _schemasLoaded: boolean = false;
  private _avaiableVersions: Array<string> = [];
  private _newSchema: Schema = new Schema({});
  private _selectedSchema: number = -1;

  constructor(
    private _globalStorage: GlobalStorageService,
    private _schemaService: SchemaService,
    private _router: Router) {}

  ngOnInit() {
    this._avaiableVersions = this._globalStorage.getAvailableCompletions();
    this._schemaService.getSchemas().subscribe((schemas) => {
      this._schemas = schemas;
      this._globalStorage.schemas = this._schemas;
      if (this._schemas !== null) {
        this._schemasLoaded = true;
      } else {
        $.snackbar(new ToastModel('Loading Schemas failed'));
      }
    });
  }

  public onAddSchemaSubmit(): void {
    if(this._selectedSchema !== -1) {
      this._newSchema.configHolder = this._schemas[this._selectedSchema].configHolder;
      this._newSchema.version = this._schemas[this._selectedSchema].version;
    } else {
      this._newSchema.configHolder = null;
    }
    this._schemaService.addSchema(this._newSchema).subscribe((schema) => {
      this._schemas.push(schema);
      this._globalStorage.schemas = this._schemas;
      $('#add-schema-modal').modal('hide');
      this._newSchema = new Schema({});
    });
  }

  private _selectSchema(id: string) {
    this._router.navigate(['Schema Edit', { id: id }]);
  }
}
