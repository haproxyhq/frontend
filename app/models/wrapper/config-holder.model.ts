import {RestWrapperModel}     from './rest-wrapper.model';
import {Config}               from './config.model';

export class ConfigHolder extends RestWrapperModel {
  public config: Array<Config> = [];

  constructor(plainObject: any) {
    super();
    this.transformPlainObject(plainObject);
  }

  protected transformPlainObject(plainObject :any): void {
    plainObject.forEach((config, index, array) => {
      this.config.push(new Config(config));
    });
  }

  public getRestModel(): Object {
    return null;
  }
}
