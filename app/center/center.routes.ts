import { RouterConfig } from '@angular/router';
import { CenterComponent } from './center.component';
import { DefaultCenterComponent } from './default.center.component';
import { ProfileComponent } from './profile.component';

export const CenterRoutes: RouterConfig = [
  {
    path: "",
    component: CenterComponent,
    children: [
      { path: "", component: DefaultCenterComponent },
      { path: "profile", component: ProfileComponent }
    ]
  }
]
