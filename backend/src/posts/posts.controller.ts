import { Controller, Post, Get, Delete, Body, Param, Put } from '@nestjs/common';
import { PostsService } from './posts.service';
import { BlogPost } from './posts.entity';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post(':username/create')
  createPost(@Body() body: { username: string; title: string; content: string; }) {
    return this.postsService.createPost(body.username, body.title, body.content);
  }

  @Get()
  getAllPosts(): Promise<BlogPost[]> {
    return this.postsService.findAllPosts();
  }

  @Get(':username/:postId')
  getPost(@Param('username') username: string, @Param('postId') postId: number): Promise<BlogPost> {
    return this.postsService.getPost(username, postId);
  }
  @Get(':username')
  getPostsByUserId(@Param('username') username: string): Promise<BlogPost[]> {
    return this.postsService.findPostsByUser(username);
  }

  @Put(':username/:postId/edit')
  updatePost(
    @Param('postId') postId: number,   // Preuzimanje postId iz URL parametra
    @Body('title') title: string,
    @Body('content') content: string   // Novi sadržaj posta iz tela zahteva
  ): Promise<BlogPost> {
    return this.postsService.updatePost(postId, title, content);
  }

  @Delete(':postId')
  deletePost(@Param('postId') postId: number): Promise<void> {
    return this.postsService.deletePost(postId);
  }

  @Post(':postId/like')
  addLike(@Param('postId') postId: number): Promise<BlogPost> {
    return this.postsService.addLike(postId);
  }
}
