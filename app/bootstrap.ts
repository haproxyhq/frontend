import {provide}                                                  from 'angular2/core';
import {bootstrap}                                                from 'angular2/platform/browser';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {HTTP_PROVIDERS}                                           from 'angular2/http';

import {AppComponent}                                             from './components/app/app.component';

// Service imports
import {CustomHttpService}                                        from './services/general/custom-http.service';
import {GlobalStorageService}                                     from './services/general/global-storage.service';
import {AuthenticationService}                                    from './services/general/authentication.service';
import {UserService}                                              from './services/user/user.service';
import {CompletionService}                                        from './services/completion/completion.service';
import {AgentService}                                             from './services/agent/agent.service';
import {SchemaService}                                            from './services/schema/schema.service';

bootstrap(AppComponent, [
  HTTP_PROVIDERS,
  ROUTER_PROVIDERS,
  provide(LocationStrategy, { useClass: HashLocationStrategy }),
  CustomHttpService,
  GlobalStorageService,
  AuthenticationService,
  UserService,
  CompletionService,
  AgentService,
  SchemaService
]);
