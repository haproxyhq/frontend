/**
 * this is a model, which holds a generic object associated, whit some kind of index
 */
export class IndexedObject<T> {
  constructor(public index: number, public object: T) {}
}
