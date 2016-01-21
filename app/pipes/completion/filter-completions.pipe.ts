import {Pipe, PipeTransform}  from 'angular2/core';

import {CompletionSection}    from '../../models/wrapper/completion-section.model';

/**
 * filters the completions data keywords
 * Usage:
 *   completions | filterCompletions:text
 * Example:
 *   {{ Completion.data |  filterCompletions:"abc"}}
 *   formats to: all items that start with abc
**/
@Pipe({name: 'filterCompletions'})
export class FilterCompletionsPipe implements PipeTransform {
  transform(values: Array<CompletionSection>, args:string[]) : any {
    return values.sort((a: CompletionSection, b: CompletionSection) => {
      if ((a.keyword + a.params) < (b.keyword + b.params)) return -1;
      if ((a.keyword + a.params) > (b.keyword + b.params)) return 1;
      return 0;
    }).filter((item: CompletionSection) => {
      let keywordStartsWith: boolean = item.keyword.startsWith(args[0]);
      let searchStartsWith: boolean = args[0].startsWith(item.keyword);

      if (keywordStartsWith) {
        item.highlight = item.keyword.substr(0, args[0].length);
        item.normal = item.keyword.substr(args[0].length);
      } else if (searchStartsWith) {
        item.highlight = item.keyword;
        item.normal = '';
      } else {
        item.highlight = '';
        item.normal = item.keyword;
      }

      return keywordStartsWith || searchStartsWith;
    });
  }
}
