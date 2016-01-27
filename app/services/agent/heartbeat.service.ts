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
  private _isHeartbeatPolling: boolean = false;
  private _heartbeatPollingEventEmitter: EventEmitter<Map<string, AgentHeartbeatStatus>> =
                                        new EventEmitter<Map<string, AgentHeartbeatStatus>>();

  constructor(private _http: CustomHttpService) {}

  /**
   * get all heartbeat information
   *
   * @returns {EventEmitter<Map<string, AgentHeartbeatStatus>>}
   */
  public getHeartbeats(): EventEmitter<Map<string, AgentHeartbeatStatus>> {
    var event: EventEmitter<Map<string, AgentHeartbeatStatus>> = new EventEmitter<Map<string, AgentHeartbeatStatus>>();
    this._attachGetHeartbeatsEvent(event);
    return event;
  }

  /**
   * starts polling the heartbeat status
   *
   * @returns {EventEmitter<Map<string, AgentHeartbeatStatus>>}
   */
  public startHeartbeatPolling(): EventEmitter<Map<string, AgentHeartbeatStatus>> {
    if(!this._isHeartbeatPolling) {
      this._isHeartbeatPolling = true;
      this._getHeartbeatPoll();
    }
    return this._heartbeatPollingEventEmitter;
  }

  /**
   * stops the heartbeat polling loop
   */
  public stopHeartbeatPolling(): void {
    this._isHeartbeatPolling = false;
  }

  /**
   * this method represents one loop cycle of polling the heartbeat status. it will keep calling itself every 60 seconds
   */
  private _getHeartbeatPoll() {
    this._attachGetHeartbeatsEvent(this._heartbeatPollingEventEmitter);

    setTimeout(() => {
      if(this._isHeartbeatPolling) {
        this._getHeartbeatPoll();
      }
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
          let heartbeats: Map<string, AgentHeartbeatStatus> = new Map<string, AgentHeartbeatStatus>();
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
