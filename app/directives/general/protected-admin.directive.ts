import {Directive, OnDestroy}                 from 'angular2/core';
import {ROUTER_DIRECTIVES, Router, Location}  from 'angular2/router';
import {GlobalStorageService}                 from '../../services/general/global-storage.service';

@Directive({
    selector: '[protected-admin]'
})

export class ProtectedAdminDirective {

    constructor(private _globalStorage: GlobalStorageService, private _router: Router, private _location: Location) {
        if (!this._globalStorage.user.isAdmin()) {
            this._location.replaceState('/');
            this._router.navigate(['Unauthorized']);
        }
    }
}
