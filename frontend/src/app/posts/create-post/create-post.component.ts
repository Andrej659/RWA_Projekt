import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: 'create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent {
  title: string = '';
  content: string = '';
  username: string = '';
  errorMessage: string = ''; // Dodajemo varijablu za poruku greške

  constructor(private postService: PostService, private router: Router, private route: ActivatedRoute) {
    this.username = postService.getUsernameFromToken() || '';
  }

  createPost() {
    // Provera da li su polja prazna
    if (!this.title || !this.content) {
      this.errorMessage = 'All fields are required.'; // Postavljamo poruku greške
      return; // Prekidamo funkciju
    }

    this.postService.createPost(this.username, this.title, this.content).subscribe(
      res => this.router.navigate(['/posts', this.username]),
      err => {
        this.errorMessage = 'Error creating post. Please try again.'; // U slučaju greške prilikom kreiranja posta
      }
    );
  }
}
