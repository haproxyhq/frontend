import {Injectable, EventEmitter} from 'angular2/core';
import {Response}                 from 'angular2/http';

import {CustomHttpService}        from '../general/custom-http.service';
import {GlobalStorageService}     from '../general/global-storage.service';

import {EmptyRestModel}           from '../../models/empty-rest.model';
import {Schema}                   from '../../models/wrapper/schema.model';

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
  public getSchemas(): EventEmitter<Array<Schema>> {
    var event: EventEmitter<Array<Schema>> = new EventEmitter();
    this._http.get(GlobalStorageService.SERVER_URL + '/schemas')
      .map((res: Response) => res.json())
      .subscribe(
        (res) => {
          let schemas: Array<Schema> = [];
          if (res.content && !(EmptyRestModel.instanceOf(res.content[0]))) {
            res.content.forEach((schema, index, array) => {
              schemas.push(new Schema(schema));
            });
          }
          event.emit(schemas);
        },
        (err) => {
          event.emit(null);
        },
        () => {}
      );
    return event;
  }

  /**
  * adds a new schema
  * @return EventEmitter<Schema>
  **/
  public addSchema(schema: Schema) {
    var event: EventEmitter<Schema> = new EventEmitter<Schema>();

    this._http.post(GlobalStorageService.SERVER_URL + '/schemas', schema.getRestModel())
      .map((res: Response) => res.json())
      .subscribe(
      (res: Response) => {
        event.next(new Schema(res));
      },
      (err) => {
        event.next(null);
      });

    return event;
  }

  /**
  * saves the given schema
  * @return EventEmitter<Schema>
  **/
  public saveSchema(schema: Schema) {
    var event: EventEmitter<Schema> = new EventEmitter<Schema>();

    this._http.patch(schema.getSelfLink(), schema.getRestModel())
      .map((res: Response) => res.json())
      .subscribe(
        (res) => {
          event.next(new Schema(res));
        },
        (err) => {
          event.next(null);
        },
        () => {}
    );
    return event;
  }

  /**
   * deletes an schema
   *
   * @param schema
   */
  public deleteSchema(schema: Schema): EventEmitter<boolean> {
    var event: EventEmitter<boolean> = new EventEmitter();

    this._http.delete(schema.getSelfLink())
      .subscribe((res) => {
        event.next(true);
      },
      (err) => {
        event.next(false);
      });

    return event;
  }
}
