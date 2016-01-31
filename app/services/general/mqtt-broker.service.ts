import {Injectable, EventEmitter} from 'angular2/core';
import {Response}                 from 'angular2/http';

import {CustomHttpService}        from './custom-http.service';
import {GlobalStorageService}     from './global-storage.service';

import {MqttBroker}               from '../../models/wrapper/mqtt-broker.model';

@Injectable()
export class MqttBrokerService {

  constructor(private _http: CustomHttpService) {}

  /**
   * gets the mqtt broker info
   * @return EventEmitter<MqttBroker>
   **/
  public getBrokerInfo(): EventEmitter<MqttBroker> {
    var event: EventEmitter<MqttBroker> = new EventEmitter();
    this._http.get(GlobalStorageService.SERVER_URL + '/mqtt/broker')
      .map((res: Response) => res.json())
      .subscribe(
        (res) => {
          let mqttBroker = new MqttBroker(res);
          event.emit(mqttBroker);
        },
        (err) => {
          event.emit(null);
        },
        () => {}
      );
    return event;
  }

}
