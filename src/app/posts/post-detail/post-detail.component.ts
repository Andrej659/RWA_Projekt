import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService, Post } from '../post.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: 'post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  standalone: true,  // Declare this component as standalone
})
export class PostDetailComponent implements OnInit {
  post: Post | undefined;

  constructor(private postService: PostService, private route: ActivatedRoute) {}

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.post = this.postService.getPost(id);
  }
}
