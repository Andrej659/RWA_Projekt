import { Component, OnInit } from '@angular/core';
import { PostService, BlogPost } from '../../services/post.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css'],
})
export class BlogListComponent implements OnInit{
  posts: BlogPost[] = [];
  buttonsVisible: boolean = true;
  username: string | null = "";
  
  constructor(private postService: PostService, private route: ActivatedRoute, private userService: UserService) {}

  ngOnInit() {
    this.postService.getAllPosts().subscribe(
      (data: any[]) => {
        this.posts = data;
      },
      (error) => {
        console.error('Failed to load posts:', error);
      }
    );
  }
}
