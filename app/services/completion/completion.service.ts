import {Injectable, EventEmitter} from 'angular2/core';
import {Response}                 from 'angular2/http';

import {CustomHttpService}        from '../../services/general/custom-http.service';

import {Completion}               from '../../models/wrapper/completion.model';
import {EmptyRestModel}           from '../../models/empty-rest.model';

declare var $;

@Injectable()
export class CompletionService {

  constructor(private _http: CustomHttpService) {}

  /**
  * gets all completions from the backend
  * @return EventEmitter<Array<Completion>>
  */
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

  /**
   * creates a new completion in the backend
   *
   * @param completion which is added
   * @returns {EventEmitter<Completion>}
   */
  public addCompletion(completion: Completion): EventEmitter<Completion> {
    var event: EventEmitter<Completion> = new EventEmitter<Completion>();

    this._http.post('http://localhost:8080/completions', completion.getRestModel())
      .map((res: Response) => res.json())
      .subscribe((res: Response) => {
        event.emit(new Completion(res));
      });

    return event;
  }

  /**
   * adds a completion by calling addCompletion, but loads the docs first, with the supplied URL
   *
   * @param completion
   * @returns {EventEmitter<Completion>}
   */
  public addCompletionWithDocs(completion: Completion): EventEmitter<Completion> {
    var event: EventEmitter<Completion> = new EventEmitter<Completion>();

    $.scrapeHAPDocs(completion.url, (response) => {
      completion.data = response;
      this.addCompletion(completion).subscribe((completion) => {
        event.emit(completion);
      });
    });

    return event;
  }

  /**
   * deletes a completion
   *
   * @param completion
   */
  public deleteCompletion(completion: Completion): void {
    this._http.delete(completion.getSelfLink())
      .map((res: Response) => res.json())
      .subscribe();
  }
}
