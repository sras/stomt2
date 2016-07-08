import { Component } from '@angular/core';
import { NavComponent } from './nav/nav.component';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  selector: 'stomt-app',
  template: `
  <h1>Stomt</h1>
  <stomt-nav></stomt-nav>
  <router-outlet></router-outlet>
  `,
  directives: [NavComponent, ROUTER_DIRECTIVES]
})

export class AppComponent {
  title = "This is the title"
}
