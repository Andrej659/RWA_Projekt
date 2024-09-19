import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PostService, Post } from '../post.service';
import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-post',
  templateUrl: 'create-post.component.html',
  styleUrls: ['./create-post.component.css'],
  standalone: true,  // Declare this component as standalone
  imports: [CommonModule, FormsModule],
})
export class CreatePostComponent {
  title: string = '';
  content: string = '';

  constructor(private postService: PostService, private authService: AuthService, private router: Router, private route: ActivatedRoute) {}

  createPost() {
    let username = this.route.snapshot.paramMap.get('username');
    const newPost: Post = {
      id: 0,
      title: this.title,
      content: this.content,
      author: username || 'Anonymous',
    };
    this.postService.addPost(newPost);
    this.router.navigate(['/posts', username]);
  }
}
