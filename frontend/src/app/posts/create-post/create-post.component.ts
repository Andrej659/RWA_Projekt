import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PostService } from '../../services/post.service';
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

  constructor(private postService: PostService, private router: Router, private route: ActivatedRoute) {}

    createPost() {
      let username = this.route.snapshot.paramMap.get('username')!;
      this.postService.createPost( username, this.title, this.content ).subscribe(
        res => this.router.navigate(['/posts', username])
      );
    }
}
