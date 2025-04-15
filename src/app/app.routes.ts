import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/pages/dashboard/dashboard.component';
import { HomeComponent } from './features/home/pages/home/home.component';
import { CreatePostComponent } from './features/post/pages/create-post/create-post.component';
import { EditPostComponent } from './features/post/pages/edit-post/edit-post.component';
import { ViewPostComponent } from './features/post/pages/view-post/view-post.component';
import { LoginComponent } from './features/user/pages/login/login.component';
import { LogoutComponent } from './features/user/pages/logout/logout.component';
import { RegisterComponent } from './features/user/pages/register/register.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'create-post',
    component: CreatePostComponent,
  },
  {
    path: 'edit-post/:slug',
    component: EditPostComponent,
  },
  {
    path: 'blog/:slug',
    component: ViewPostComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'logout',
    component: LogoutComponent,
  },
];
