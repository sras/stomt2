import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  selector: 'stomt-nav',
  template: `
    <ul>
    <li><a [routerLink]="['/']">Home</a></li>
    <li><a [routerLink]="['/profile']">Profile</a></li>
    </ul>
    `,
  directives: [ ROUTER_DIRECTIVES ]
})

export class NavComponent {
}
