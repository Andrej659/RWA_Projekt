import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { AppComponent } from './app/app.component';
import { LoginComponent } from './app/login/login.component';
import { BlogListComponent } from './app/posts/blog-list/blog-list.component';
import { CreatePostComponent } from './app/posts/create-post/create-post.component';
import { PostDetailComponent } from './app/posts/post-detail/post-detail.component';
import { EditPostComponent } from './app/posts/edit-post/edit-post.component';
import { AuthGuard } from './app/auth/auth.guard';
import { RegisterComponent } from './app/register/register.component';
import { UsersComponent } from './app/users/users.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'users', component: UsersComponent },
  { path: 'posts', component: BlogListComponent },
  { path: 'posts/:username', component: BlogListComponent },
  { path: 'posts/:username/:id', component: PostDetailComponent },
  { path: 'posts/:username/:id/edit', component: EditPostComponent, canActivate: [AuthGuard] },
  { path: 'create/:username', component: CreatePostComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/posts', pathMatch: 'full' },
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),  // Provide the routes here
  ],
}).catch((err) => console.error(err));



// import { bootstrapApplication } from '@angular/platform-browser';
// import { appConfig } from './app/app.config';
// import { AppComponent } from './app/app.component';

// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));
