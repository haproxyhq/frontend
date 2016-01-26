import {RestWrapperModel} from './rest-wrapper.model';
/**
 * holds information about the heartbeat status of an agent
 */
export class AgentHeartbeatStatus extends RestWrapperModel {
  public agentAlive: boolean;
  public haproxyAlive: boolean;

  constructor(plainObject: any) {
    super();
    this.transformPlainObject(plainObject);
  }

  getRestModel(): Object {
    return this._transformToPOJO('agentAlive', 'haproxyAlive');
  }

  protected transformPlainObject(plainObject: any): void {
    this._transformFromPOJO(plainObject, 'agentAlive', 'haproxyAlive');
  }
}
