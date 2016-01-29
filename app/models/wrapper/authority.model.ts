import {RestWrapperModel} from './rest-wrapper.model';

export class Authority extends RestWrapperModel {
  constructor(public authority: string, public description: string, public name: string) {
    super();
  }

  getRestModel(): Object {
    return this._transformToPOJO('authority', 'description', 'name');
  }

  protected transformPlainObject(plainObject: any): void {
    this._transformToPOJO(plainObject, 'authority', 'description', 'name');
  }
}
