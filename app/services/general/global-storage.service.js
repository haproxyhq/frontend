System.register(['angular2/core', 'angular2/http'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1;
    var GlobalStorageService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            GlobalStorageService = (function () {
                function GlobalStorageService() {
                    this._isAuthenticated = false;
                    this._accessToken = "";
                    this._headers = new http_1.Headers();
                }
                Object.defineProperty(GlobalStorageService.prototype, "authenticated", {
                    get: function () {
                        return this._isAuthenticated;
                    },
                    set: function (value) {
                        this._isAuthenticated = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(GlobalStorageService.prototype, "accessToken", {
                    get: function () {
                        return this._accessToken;
                    },
                    set: function (accessToken) {
                        this._accessToken = accessToken;
                        this._headers.append('X-Auth-Token', this._accessToken);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(GlobalStorageService.prototype, "headers", {
                    get: function () {
                        return this._headers;
                    },
                    enumerable: true,
                    configurable: true
                });
                GlobalStorageService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], GlobalStorageService);
                return GlobalStorageService;
            })();
            exports_1("GlobalStorageService", GlobalStorageService);
        }
    }
});
//# sourceMappingURL=global-storage.service.js.map