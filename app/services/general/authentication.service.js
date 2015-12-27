System.register(['angular2/core', 'angular2/http', '../../services/general/global-storage.service'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, global_storage_service_1;
    var AuthenticationService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (global_storage_service_1_1) {
                global_storage_service_1 = global_storage_service_1_1;
            }],
        execute: function() {
            AuthenticationService = (function () {
                function AuthenticationService(_http, _globalStorage) {
                    this._http = _http;
                    this._globalStorage = _globalStorage;
                }
                AuthenticationService.prototype.login = function (user) {
                    var _this = this;
                    var event = new core_1.EventEmitter();
                    var headers = this._globalStorage.headers;
                    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
                    headers.append('Accept', 'application/json;charset=utf-8');
                    this._http.post('http://localhost:8080/login', user, { headers: headers })
                        .map(function (res) { return res.json(); })
                        .subscribe(function (res) {
                        _this._globalStorage.authenticated = true;
                        _this._globalStorage.accessToken = res.accessToken;
                        event.next(true);
                    }, function () {
                        event.next(false);
                    });
                    return event;
                };
                AuthenticationService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http, global_storage_service_1.GlobalStorageService])
                ], AuthenticationService);
                return AuthenticationService;
            })();
            exports_1("AuthenticationService", AuthenticationService);
        }
    }
});
//# sourceMappingURL=authentication.service.js.map