import {RestWrapperModel} from './rest-wrapper.model';

export class Agent extends RestWrapperModel {
  public name: string;
  public description: string;
  public ip: string;
  public version: string;

  constructor(plainObject: any) {
    super();
    this.transformPlainObject(plainObject);
  }

  getRestModel():Object {
    return {};
  }

  transformPlainObject(plainObject:any):void {
  }
}
