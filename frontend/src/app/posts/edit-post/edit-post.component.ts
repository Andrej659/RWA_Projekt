import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService, BlogPost } from '../../services/post.service';
import { UserService } from '../../services/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-post',
  templateUrl: 'edit-post.component.html',
  styleUrls: ['./edit-post.component.css'],
})
export class EditPostComponent implements OnInit {
  post: BlogPost | undefined;
  username: string = '';
  errorMessage: string = ''; 

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.username = this.route.snapshot.paramMap.get('username')!;
    this.postService.getSingleUserPost(id, this.username).subscribe(
      (res) => {
        this.post = res as BlogPost;
      },
      (error) => {
        this.errorMessage = 'Failed to load post.';
      }
    );
  }

  editPost(form: NgForm) {
    if (form.valid && this.post) {
      this.postService.updatePost(this.post.postId, this.post.title, this.post.content, this.username).subscribe(
        res => {
          this.router.navigate(['/posts', this.username]);
        },
        error => {
          this.errorMessage = 'Failed to update post.'; 
        }
      );
    } else {
      this.errorMessage = 'Please fill in all required fields.';
    }
  }
}
