import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService, BlogPost } from '../../services/post.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: 'post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  standalone: true,  // Declare this component as standalone
})
export class PostDetailComponent implements OnInit {
  post: BlogPost | undefined;
  username : string = "";
  constructor(private postService: PostService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.username = this.route.snapshot.paramMap.get('username')!;
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.postService.getPost(id, this.username).subscribe(
      (res) => {
        this.post = res as BlogPost;
      }
    );
  }
}
