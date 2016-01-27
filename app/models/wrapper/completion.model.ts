import {CompletionSection}  from './completion-section.model';
import {RestWrapperModel}   from './rest-wrapper.model';

export class Completion extends RestWrapperModel {
  public url: string;
  public version: string;
  public data: Array<CompletionSection> = [];

  constructor(plainCompletion: any) {
    super();
    this.transformPlainObject(plainCompletion);
  }

  getRestModel():Object {
    return this._transformToPOJO('url', 'version', 'data');
  }

  transformPlainObject(plainObject:any):void {
    this.url = plainObject.url;
    this.version = plainObject.version;

    if(plainObject.data !== null && plainObject.data !== undefined) {
      plainObject.data.forEach((elem: any, index, array) => {
        this.data.push(new CompletionSection(elem.keyword, elem.params, elem.anchor));
      });
    } else {
      this.data = undefined;
    }
  }
}
