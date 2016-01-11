import {Directive, OnDestroy}                 from 'angular2/core';
import {ROUTER_DIRECTIVES, Router, Location}  from 'angular2/router';
import {GlobalStorageService}                 from '../../services/general/global-storage.service';

@Directive({
    selector: '[protected]'
})

export class ProtectedDirective {

    constructor(private _globalStorage: GlobalStorageService, private _router: Router, private _location: Location) {
        if (!this._globalStorage.authenticated) {
            this._location.replaceState('/');
            this._router.navigate(['Login']);
        }
    }
}
