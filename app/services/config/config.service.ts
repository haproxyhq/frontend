import {Injectable, EventEmitter} from 'angular2/core';
import {Response}                 from 'angular2/http';

import {CustomHttpService}        from '../../services/general/custom-http.service';

import {Config}                   from '../../models/wrapper/config.model';
import {EmptyRestModel}           from '../../models/empty-rest.model';

@Injectable()
export class ConfigService {

  constructor(private _http: CustomHttpService) {}

  /**
  * gets all configs from the backend
  * @return EventEmitter<Config>
  **/
  public getConfigs(): EventEmitter<Array<Config>> {
    var event: EventEmitter<Array<Config>> = new EventEmitter();
    this._http.get('http://localhost:8080/configs')
      .map((res: Response) => res.json())
      .subscribe(
        (res) => {
          let configs: Array<Config> = [];
          if (res.content && !(EmptyRestModel.instanceOf(res.content[0]))) {
            res.content.forEach((config, index, array) => {
              configs.push(new Config(config));
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
