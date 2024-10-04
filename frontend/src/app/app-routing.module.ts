import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogListComponent } from './posts/blog-list/blog-list.component';
import { CreatePostComponent } from './posts/create-post/create-post.component';
import { EditPostComponent } from './posts/edit-post/edit-post.component';
import { PostDetailComponent } from './posts/post-detail/post-detail.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserBlogListComponent } from './posts/blog-list/user-blog-list.component';
import { AuthGuard } from '../auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'posts', component: BlogListComponent,  canActivate: [AuthGuard] },

  { path: 'posts/:username', component: UserBlogListComponent,  canActivate: [AuthGuard] },
  { path: 'posts/:username/create', component: CreatePostComponent,  canActivate: [AuthGuard]},
  { path: 'posts/posts/:id', component: PostDetailComponent,  canActivate: [AuthGuard] },
  { path: 'posts/posts/:id/like', component: PostDetailComponent,  canActivate: [AuthGuard] },
  { path: 'posts/:username/:id', component: PostDetailComponent,  canActivate: [AuthGuard] },
  { path: 'posts/:username/:id/edit', component: EditPostComponent,  canActivate: [AuthGuard]},
  { path: '', redirectTo: '/register', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

