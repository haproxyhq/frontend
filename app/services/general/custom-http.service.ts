import {Http, Request, Headers, Response}                   from 'angular2/http';
import {RequestOptionsArgs, RequestOptions, RequestMethod}  from 'angular2/http';
import {Injectable}                                         from 'angular2/core';
import {Observable}                                         from 'rxjs/Observable';
import 'rxjs/add/operator/do';

import {GlobalStorageService}   from '../../services/general/global-storage.service';

@Injectable()
export class CustomHttpService {
  constructor(private _globalStorage: GlobalStorageService, private http: Http) {
  }

  public request(url: string | Request, options?: RequestOptionsArgs) {
    let req: Request;
    if (typeof url === 'string') {
      let reqOpt = new RequestOptions(options);
      reqOpt.url = url;
      req = new Request(reqOpt);
    } else {
      req = url;
    }

    this._beforeCall(req);
    return this.http.request(req).do((res:Response) => { this._afterCall(res); });
  }

  public get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    let opts: RequestOptionsArgs = this._build(RequestMethod.Get, url, options);
    return this.http.get(url, opts).do((res:Response) => { this._afterCall(res); });
  }

  public post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    let bodyString: string = JSON.stringify(body);
    let opts: RequestOptionsArgs = this._build(RequestMethod.Post, url, options, bodyString);
    return this.http.post(url, bodyString, opts).do((res:Response) => { this._afterCall(res); });
  }

  public put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    let bodyString: string = JSON.stringify(body);
    let opts: RequestOptionsArgs = this._build(RequestMethod.Put, url, options, bodyString);
    return this.http.put(url, bodyString, opts).do((res:Response) => { this._afterCall(res); });
  }

  public patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    let bodyString: string = JSON.stringify(body);
    let opts: RequestOptionsArgs = this._build(RequestMethod.Get, url, options, bodyString);
    return this.http.patch(url, bodyString, opts).do((res:Response) => { this._afterCall(res); });
  }

  public delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    let opts: RequestOptionsArgs = this._build(RequestMethod.Delete, url, options);
    return this.http.delete(url, opts).do((res:Response) => { this._afterCall(res); });
  }

  private _beforeCall(req: Request | RequestOptionsArgs): void {
    if (this._globalStorage.accessToken !== null) {
      req.headers.append(GlobalStorageService.ACCESS_TOKEN_HEADER_KEY, this._globalStorage.accessToken);
    }
    req.headers.append('Accept', 'application/json;charset=utf-8');
    if (!req.headers.has('Content-Type')) req.headers.append('Content-Type', 'application/json;charset=utf-8');
  }

  private _afterCall(res: Response) {
    this._globalStorage.accessToken = res.headers.get('X-Auth-Token');
  }

  private _build(method: RequestMethod, url: string, options: RequestOptionsArgs, body?: string): RequestOptionsArgs {
    let aBody = body ? body : options && options.body ? options.body : undefined;
    let opts: RequestOptionsArgs = {
      method: method,
      url: url,
      headers: options && options.headers ? options.headers : new Headers(),
      search: options && options.search ? options.search : undefined,
      body: aBody
    };
    this._beforeCall(opts);
    return opts;
  }
}
