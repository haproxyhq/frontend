export class EmptyRestModel {
  public static instanceOf(object: any): boolean {
    return 'value' in object && 'relTargetType' in object && 'rel' in object && 'collectionValue' in object;
  }
}
