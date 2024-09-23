// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { FormsModule } from '@angular/forms';
// // import { RouterModule, Routes } from '@angular/router';  // Import RouterModule

// import { AppComponent } from './app.component';
// import { LoginComponent } from './login/login.component';
// import { BlogListComponent } from './posts/blog-list/blog-list.component';
// import { CreatePostComponent } from './posts/create-post/create-post.component';
// import { EditPostComponent } from './posts/edit-post/edit-post.component';
// import { PostDetailComponent } from './posts/post-detail/post-detail.component';
// import { AuthGuard } from './auth/auth.guard';
// import { AuthService } from './auth/auth.service';
// import { AppRoutingModule } from './app-routing.module';  // Import routing module
// import { RouterModule } from '@angular/router';

// // const appRoutes: Routes = [
// //   { path: 'login', component: LoginComponent },
// //   { path: 'posts', component: BlogListComponent },
// //   { path: 'posts/:id', component: PostDetailComponent },
// //   { path: 'posts/:id/edit', component: EditPostComponent, canActivate: [AuthGuard] },
// //   { path: 'create', component: CreatePostComponent, canActivate: [AuthGuard] },
// //   { path: '', redirectTo: '/posts', pathMatch: 'full' }, // Default redirect
// // ];

// @NgModule({
//   declarations: [
//     AppComponent,
//     LoginComponent,
//     BlogListComponent,
//     CreatePostComponent,
//     EditPostComponent,
//     PostDetailComponent,
//   ],
//   imports: [
//     BrowserModule,
//     FormsModule,
//     AppRoutingModule,
//     RouterModule,
//     // RouterModule.forRoot(appRoutes), // Register RouterModule with routes
//   ],
//   providers: [AuthService, AuthGuard],
//   bootstrap: [AppComponent],
// })
// export class AppModule {}