import {Injectable, EventEmitter} from 'angular2/core';
import {Response}                 from 'angular2/http';

import {CustomHttpService}        from '../../services/general/custom-http.service';

import {EmptyRestModel}           from '../../models/empty-rest.model';
import {Schema} from '../../models/wrapper/schema.model.ts';

/**
 * takes care of all CRUD operations on schemas
 */
@Injectable()
export class SchemaService {

  constructor(private _http: CustomHttpService) {}

  /**
   * gets all schemas from the backend
   * @return EventEmitter<Config>
   **/
  public getConfigs(): EventEmitter<Array<Schema>> {
    var event: EventEmitter<Array<Schema>> = new EventEmitter();
    this._http.get('http://localhost:8080/schemas')
      .map((res: Response) => res.json())
      .subscribe(
        (res) => {
          let configs: Array<Schema> = [];
          if (res.content && !(EmptyRestModel.instanceOf(res.content[0]))) {
            res.content.forEach((config, index, array) => {
              configs.push(new Schema(config));
            });
          }
          event.emit(configs);
        },
        (err) => {
          event.emit(null);
        },
        () => {}
      );
    return event;
  }
}
