import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService, BlogPost } from '../../services/post.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-edit-post',
  templateUrl: 'edit-post.component.html',
  styleUrls: ['./edit-post.component.css'],
  standalone: true,  // Declare this component as standalone
  imports: [CommonModule, FormsModule],
})
export class EditPostComponent implements OnInit {
  post: BlogPost | undefined;
  username: string = '';
  constructor(private postService: PostService, private route: ActivatedRoute, private router: Router, private userService: UserService ) {}

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.username = this.route.snapshot.paramMap.get('username')!;
    this.postService.getPost(id, this.username).subscribe(
      (res) => {
        this.post = res as BlogPost;
      }
    );
  }

  editPost() {
    if (this.post) {
      this.postService.updatePost(this.post.postId, this.post.title, this.post.content, this.username).subscribe(
        res => this.router.navigate(['/posts', this.userService.getLoggedInUser()])
      );
      
    }
  }
}
