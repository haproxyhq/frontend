import {ConfigSection}  from './config-section.model';

export class Config {
  public section: ConfigSection;
  public values: Array<String> = [];

  constructor(plainObject: any) {
    this.section = new ConfigSection(plainObject.section.name, plainObject.section.type);
    this.values = plainObject.values;
  }
}
