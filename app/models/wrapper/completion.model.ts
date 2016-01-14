import {CompletionSection}  from './completion-section.model';

export class Completion {
  public url: string;
  public version: string;
  public data: Array<CompletionSection> = new Array<CompletionSection>();

  constructor(plainCompletion: any) {
    this.url = plainCompletion.url;
    this.version = plainCompletion.version;

    plainCompletion.data.forEach((elem: any, index, array) => {
      this.data.push(new CompletionSection(elem.keyword, elem.params, elem.id));
    });
  }
}
