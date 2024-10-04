import { Component, OnInit } from '@angular/core';
import { PostService, BlogPost } from '../../services/post.service';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-blog-list',
  templateUrl: './user-blog-list.component.html',
  styleUrls: ['./blog-list.component.css'],
})
export class UserBlogListComponent implements OnInit{
  posts: BlogPost[] = [];
  buttonsVisible: boolean = true;
  username : string = '';
  
  constructor(private postService: PostService, private route: ActivatedRoute, private userService: UserService) {
    this.username = postService.getUsernameFromToken() || '';
  }

  ngOnInit() {
    this.postService.getUserPosts(this.username).subscribe(
      (data: any[]) => {
        this.posts = data;  // Postavi postove iz backend-a
      },
      (error) => {
        console.error('Failed to load posts:', error);
      }
    );
  }

  deletePost(id: number) {
    this.postService.deletePost(id).subscribe(
      res => this.posts = this.posts.filter(obj => obj.postId != id)
    );
  }
}
