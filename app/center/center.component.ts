import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { DefaultCenterComponent } from './default.center.component';

@Component({
  template: `
  <h1>Stomt Center</h1>
  <router-outlet></router-outlet>
  `,
  directives: [ROUTER_DIRECTIVES, DefaultCenterComponent]
})

export class CenterComponent {
}
