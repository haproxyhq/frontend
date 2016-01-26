import {Injectable, EventEmitter} from 'angular2/core';
import {Response}                 from 'angular2/http';

import {CustomHttpService}        from '../../services/general/custom-http.service';

import {Agent}                    from '../../models/wrapper/agent.model';
import {AgentHeartbeatStatus} from '../../models/wrapper/agent-heartbeat-status.model';

/**
 * gets all heartbeat information from the backend
 */
@Injectable()
export class HeartbeatService {

  constructor(private _http: CustomHttpService) {}

  /**
   * get all heartbeat information
   *
   * @returns {EventEmitter<Map<string, AgentHeartbeatStatus>>}
   */
  public getHeartbeats(): EventEmitter<Map<string, AgentHeartbeatStatus>> {
    var event: EventEmitter<Map<string, AgentHeartbeatStatus>> = new EventEmitter<>();
    this._attachGetHeartbeatsEvent(event);
    return event;
  }

  /**
   * starts polling the heartbeat status
   *
   * @returns {EventEmitter<Map<string, AgentHeartbeatStatus>>}
   */
  public startHeartbeatPolling(): EventEmitter<Map<string, AgentHeartbeatStatus>> {
    var event: EventEmitter<Map<string, AgentHeartbeatStatus>> = new EventEmitter<>();
    this._getHeartbeatPoll(event);
    return event;
  }

  /**
   * this method represents one loop cycle of polling the heartbeat status. it will keep calling itself every 60 seconds
   *
   * @param event the EventEmitter to emit on when the request returns
   */
  private _getHeartbeatPoll(event) {
    this._attachGetHeartbeatsEvent(event);
    setTimeout(() => {
      this._getHeartbeatPoll(event);
    }, 30000);
  }

  /**
   * attaches an get heartbeat event to an EventEmitter
   *
   * @param event EventEmitter
   * @returns {EventEmitter<Map<string, AgentHeartbeatStatus>>}
   */
  private _attachGetHeartbeatsEvent(event: EventEmitter<Map<string, AgentHeartbeatStatus>>): void {
    this._http.get('http://localhost:8080/agents/heartbeats')
      .map((res: Response) => res.json())
      .subscribe(
        (res) => {
          let heartbeats: Map<string, AgentHeartbeatStatus> = new Map<>();
          if(res) {
            Object.keys(res).forEach((elem, index) => {
              heartbeats.set(elem, new AgentHeartbeatStatus(res[elem]));
            });
          }
          event.emit(heartbeats);
        },
        (err) => {
          event.emit(null);
        },
        () => {}
      );
  }
}
