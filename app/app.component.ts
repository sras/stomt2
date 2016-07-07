import { Component } from '@angular/core';
import { NavComponent } from './nav/nav.component';

@Component({
  selector: 'stomt-app',
  template: `
  <h1>Stomt</h1>
  <stomt-nav></stomt-nav>
  `,
  directives: [NavComponent]

})

export class AppComponent {
  title = "This is the title"
}
