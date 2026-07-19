import { Route } from '@angular/router';
import { CfpFormComponent } from './cfp-form/cfp-form.component';
import { CfpDashboardComponent } from './cfp-dashboard/cfp-dashboard.component';
import { EventFormComponent } from './event-form/event-form.component';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'event/new', pathMatch: 'full' },
  { path: 'event/new', component: EventFormComponent },
  { path: 'talks/new', component: CfpFormComponent },
  { path: 'dashboard', component: CfpDashboardComponent }
];
