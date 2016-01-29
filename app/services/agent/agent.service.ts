import {Injectable, EventEmitter} from 'angular2/core';
import {Response}                 from 'angular2/http';

import {CustomHttpService}        from '../../services/general/custom-http.service';

import {Agent}                    from '../../models/wrapper/agent.model';
import {EmptyRestModel}           from '../../models/empty-rest.model';

@Injectable()
export class AgentService {

  constructor(private _http: CustomHttpService) {}

  /**
  * gets all agents from the backend
  * @return EventEmitter<Array<Agent>>
  **/
  public getAgents(): EventEmitter<Array<Agent>> {
    var event: EventEmitter<Array<Agent>> = new EventEmitter<Array<Agent>>();

    this._http.get('http://localhost:8080/agents')
      .map((res: Response) => res.json())
      .subscribe(
        (res) => {
          let agents: Array<Agent> = [];
          if(res.content && !(EmptyRestModel.instanceOf(res.content[0]))) {
            res.content.forEach((elem, index, array) => {
              agents.push(new Agent(elem));
            });
          }
          event.emit(agents);
        },
        (err) => {
          event.emit(null);
        },
        () => {}
      );
    return event;
  }

  /**
  * adds a new agent
  * @return EventEmitter<Agent>
  **/
  public addAgent(agent: Agent) {
    var event: EventEmitter<Agent> = new EventEmitter<Agent>();

    this._http.post('http://localhost:8080/agents', agent.getRestModel())
      .map((res: Response) => res.json())
      .subscribe((res: Response) => {
        event.emit(new Agent(res));
      });

    return event;
  }

  /**
  * saves the given agent
  * @return EventEmitter<Agent>
  **/
  public saveAgent(agent: Agent) {
    var event: EventEmitter<Agent> = new EventEmitter<Agent>();

    this._http.patch(agent.getSelfLink(), agent.getRestModel())
      .map((res: Response) => res.json())
      .subscribe(
        (res) => {
          event.next(new Agent(res));
        },
        (err) => {
          event.next(null);
        },
        () => {}
    );
    return event;
  }

  /**
   * deletes a completion
   *
   * @param completion
   */
  public deleteAgent(agent: Agent): EventEmitter<boolean> {
    var event: EventEmitter<boolean> = new EventEmitter();

    this._http.delete(agent.getSelfLink())
      .subscribe((res) => {
        event.next(true);
      },
      (err) => {
        event.next(false);
      });

    return event;
  }
}
