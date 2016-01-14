export class CompletionSection {
  public highlight: string;
  public normal: string;

  constructor(public keyword: string, public params: string, public anchor: string) {}
}
