import {Injectable, EventEmitter} from 'angular2/core';
import {Response}                 from 'angular2/http';

import {CustomHttpService}        from '../../services/general/custom-http.service';

import {Completion}               from '../../models/wrapper/completion.model';
import {EmptyRestModel}           from '../../models/empty-rest.model';

@Injectable()
export class CompletionService {

  constructor(private _http: CustomHttpService) {}

  /**
  * gets all completions from the backend
  * @return EventEmitter<Array<Completion>>
  **/
  public getCompletions(): EventEmitter<Array<Completion>> {
    var event: EventEmitter<Array<Completion>> = new EventEmitter<Array<Completion>>();
    this._http.get('http://localhost:8080/completions')
      .map((res: Response) => res.json())
      .subscribe(
        (res) => {
          let completions: Array<Completion> = [];
          if(res.content && !(EmptyRestModel.instanceOf(res.content[0]))) {
            res.content.forEach((elem, index, array) => {
              completions.push(new Completion(elem));
            });
          }
          event.emit(completions);
        },
        (err) => {
          event.emit(null);
        },
        () => {}
      );
    return event;
  }
}
