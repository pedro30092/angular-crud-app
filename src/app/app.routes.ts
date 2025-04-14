import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/pages/dashboard/dashboard.component';
import { CreatePostComponent } from './features/post/pages/create-post/create-post.component';

export const routes: Routes = [
  {
    path: 'create-post',
    component: CreatePostComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
];
