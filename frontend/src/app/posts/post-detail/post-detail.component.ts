import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService, BlogPost } from '../../services/post.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: 'post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
})
export class PostDetailComponent implements OnInit {
  post: BlogPost | undefined;
  username : string = "";
  constructor(private postService: PostService, private route: ActivatedRoute, private userService: UserService) {}

        ngOnInit() {
          const id = +this.route.snapshot.paramMap.get('id')!;
          this.postService.getPost(id).subscribe(
            (res) => {
              console.log(res);
              this.post = res.post as BlogPost;
              this.username = res.username;
              console.log(this.post)
            }
          );
        }

        likePost() {
          if (this.post) {
                this.post.lajkovi += 1; // Ažuriraj broj lajkova
                this.postService.likePost(this.post.postId);
            }
        }  
}
