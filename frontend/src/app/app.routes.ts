import { Route } from '@angular/router';
import { CfpFormComponent } from './cfp-form/cfp-form.component';
import { CfpDashboardComponent } from './cfp-dashboard/cfp-dashboard.component';

export const appRoutes: Route[] = [
  { path: '', component: CfpFormComponent },
  { path: 'dashboard', component: CfpDashboardComponent }
];
