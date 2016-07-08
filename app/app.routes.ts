import { provideRouter, RouterConfig } from '@angular/router';
import { AppComponent } from './app.component';
import { CenterRoutes } from './center/center.routes';

export const routes: RouterConfig = [
  ...CenterRoutes
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
