import { Component, OnInit } from '@angular/core';
import { PostService, Post } from '../post.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth/auth.service';


@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css'],
  standalone: true,  // Declare this component as standalone
  imports: [CommonModule, FormsModule, RouterModule],
})
export class BlogListComponent implements OnInit{
  posts: Post[] = [];
  buttonsVisible: boolean = true;
  username: String | null = "";
  
  constructor(private postService: PostService, private authService: AuthService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.username = this.route.snapshot.paramMap.get('username');
    this.buttonsVisible = this.username == this.authService.getUsername();
    if(this.username) {
      this.posts = this.postService.getUserPosts(this.username);
    } else {
      this.posts = this.postService.getPosts();
    }
  }

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  deletePost(id: number) {
    this.postService.deletePost(id);
    let temp = this.authService.getUsername() == null ? "" : this.authService.getUsername();
    this.posts = this.postService.getUserPosts(temp!);
  }
}
