import {Component}                              from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, Router} from 'angular2/router';

import {HomeComponent}                          from '../home/home.component';
import {SchemasComponent}                       from '../schema/schemas.component';
import {AgentsComponent}                        from '../agent/agents.component';
import {AgentEditComponent}                     from '../agent/agent-edit.component';
import {AboutComponent}                         from '../about/about.component';
import {LoginComponent}                         from '../login/login.component';
import {SettingsComponent}                      from '../settings/settings.component';
import {SettingsProfileComponent}               from '../settings/settings-profile.component';
import {UnauthorizedComponent}                  from '../general/unauthorized.component';
import {LogoutComponent}                        from '../logout/logout.component';

import {GlobalStorageService}                   from '../../services/general/global-storage.service';

@Component({
  selector: 'app',
  templateUrl: './components/app/app.component.html',
  styleUrls: ['./components/app/app.component.css'],
  directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
  { path:'/',                   name: 'Home',                 component: HomeComponent },
  { path:'/schemas',            name: 'Schemas',              component: SchemasComponent },
  { path:'/agents',             name: 'Agents',               component: AgentsComponent },
  { path:'/agents/:id',         name: 'Agent Edit',           component: AgentEditComponent },
  { path:'/about',              name: 'About',                component: AboutComponent },
  { path:'/login',              name: 'Login',                component: LoginComponent },
  { path:'/settings/profile',   name: 'Settings Profile',     component: SettingsProfileComponent },
  { path:'/settings/admin',     name: 'Settings Admin',       component: SettingsComponent },
  { path:'/unauthorized',       name: 'Unauthorized',         component: UnauthorizedComponent },
  { path:'/logout',             name: 'Logout',               component: LogoutComponent }
])

export class AppComponent {
  constructor(private _globalStorage: GlobalStorageService, private _router: Router) { }

  isActive(route) {
    return this._router.isRouteActive(this._router.generate(route));
  }
}
