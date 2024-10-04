import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BlogListComponent } from './posts/blog-list/blog-list.component';
import { CreatePostComponent } from './posts/create-post/create-post.component';
import { EditPostComponent } from './posts/edit-post/edit-post.component';
import { PostDetailComponent } from './posts/post-detail/post-detail.component';
import { AuthGuard } from '../auth.guard';
import { AuthService } from '../auth.service';
import { AppRoutingModule } from './app-routing.module';  // Import routing module
import { RegisterComponent } from './register/register.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from '../token.interceptor';
import { PostService } from './services/post.service';
import { UserService } from './services/user.service';
import { RouterModule } from '@angular/router';
import { UserBlogListComponent } from './posts/blog-list/user-blog-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BlogListComponent,
    CreatePostComponent,
    EditPostComponent,
    PostDetailComponent,
    RegisterComponent,
    UserBlogListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule 
  ],
  providers: [
    AuthService,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    PostService,
    UserService
],
  bootstrap: [AppComponent],
})
export class AppModule {}