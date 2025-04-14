import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/pages/dashboard/dashboard.component';
import { CreatePostComponent } from './features/post/pages/create-post/create-post.component';
import { EditPostComponent } from './features/post/pages/edit-post/edit-post.component';

export const routes: Routes = [
  {
    path: 'create-post',
    component: CreatePostComponent,
  },
  {
    path: 'edit-post/:slug',
    component: EditPostComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
];
