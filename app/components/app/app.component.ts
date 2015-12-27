import {Component, OnInit}                      from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, Router} from 'angular2/router';

import {HomeComponent}                          from '../home/home.component'
import {AboutComponent}                         from '../about/about.component'
import {LoginComponent}                         from '../login/login.component'

@Component({
  selector: 'app',
  templateUrl: './app/components/app/app.component.html',
  styleUrls: ['./app/components/app/app.component.css'],
  directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
  { path:'/',      name: 'Home',   component: HomeComponent },
  { path:'/about', name: 'About',  component: AboutComponent },
  { path:'/login', name: 'Login',  component: LoginComponent }
])

export class AppComponent {
  constructor(private _router: Router) { }

  isActive(route) {
    return this._router.isRouteActive(this._router.generate(route)));
  }
}
