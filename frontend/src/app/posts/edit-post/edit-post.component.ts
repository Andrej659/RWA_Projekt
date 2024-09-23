import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService, Post } from '../../auth/post.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../auth/user.service';


@Component({
  selector: 'app-edit-post',
  templateUrl: 'edit-post.component.html',
  styleUrls: ['./edit-post.component.css'],
  standalone: true,  // Declare this component as standalone
  imports: [CommonModule, FormsModule],
})
export class EditPostComponent implements OnInit {
  post: Post | undefined;

  constructor(private postService: PostService, private route: ActivatedRoute, private router: Router, private userService: UserService ) {}

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id')!;
    const username = this.route.snapshot.paramMap.get('username')!;
    this.postService.getPost(id, username).subscribe(
      (res) => {
        this.post = res as Post;
      }
    );
  }

  editPost() {
    if (this.post) {
      this.postService.updatePost(this.post.id, this.post.title, this.post.content, this.post.author).subscribe(
        res => this.router.navigate(['/posts', this.userService.getLoggedInUser()])
      );
      
    }
  }
}
