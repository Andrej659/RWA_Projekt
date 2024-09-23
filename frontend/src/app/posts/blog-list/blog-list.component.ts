import { Component, OnInit } from '@angular/core';
import { PostService, Post } from '../../auth/post.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { UserService } from '../../auth/user.service';


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
  username: string | null = "";
  
  constructor(private postService: PostService, private route: ActivatedRoute, private userService: UserService) {}

  ngOnInit() {
    this.username = this.route.snapshot.paramMap.get('username');
    this.buttonsVisible = this.username == this.userService.getLoggedInUser();
    if(this.username) {
      this.postService.getUserPosts(this.username).subscribe(
        (res) => {
          this.posts = res as Post[];
        }
      );
    } else {
      this.postService.getAllPosts().subscribe(
        (res) => {
          this.posts = res as Post[];
        }
      );;
    }
  }

  deletePost(id: number) {
    this.postService.deletePost(id).subscribe(
      res => this.posts = this.posts.filter(obj => obj.id != id)
    );
  }
}
