import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService, Post } from '../post.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';


@Component({
  selector: 'app-edit-post',
  templateUrl: 'edit-post.component.html',
  styleUrls: ['./edit-post.component.css'],
  standalone: true,  // Declare this component as standalone
  imports: [CommonModule, FormsModule],
})
export class EditPostComponent implements OnInit {
  post: Post | undefined;

  constructor(private postService: PostService, private route: ActivatedRoute, private router: Router, private authService: AuthService ) {}

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.post = this.postService.getPost(id);
  }

  editPost() {
    if (this.post) {
      this.postService.editPost(this.post);
      this.router.navigate(['/posts', this.authService.getUsername()]);
    }
  }
}
