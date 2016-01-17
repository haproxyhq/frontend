import {Link}     from './link.model';

export abstract class RestWrapperModel {
  public links: Array<Link>;

  public getSelfLink(): string {
    return this.links.find((link, index, array): boolean => {
      return link.rel === 'self';
    }).href;
  }
  public abstract getRestModel(): Object;
  public abstract transformPlainObject(plainObject: any): void;
}
