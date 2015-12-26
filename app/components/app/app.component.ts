import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {HomeComponent} from '../home/home.component'
import {AboutComponent} from '../about/about.component'

@Component({
  selector: 'app',
  templateUrl: './app/components/app/app.component.html',
  styleUrls: ['./app/components/app/app.component.css'],
  directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
  { path:'/about', name: 'About',  component: AboutComponent },
  { path:'/',      name: 'Home',   component: HomeComponent }
])

export class AppComponent {

}
