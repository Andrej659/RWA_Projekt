import { Controller, Post, Get, Delete, Body, Param, Put } from '@nestjs/common';
import { PostsService } from './posts.service';
import { BlogPost } from './posts.entity';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post(':username/create')
  createPost(@Body() body: { autorId: number; title: string; content: string; }) {
    return this.postsService.createPost(body.autorId, body.title, body.content);
  }

  @Get()
  getAllPosts(): Promise<BlogPost[]> {
    return this.postsService.findAllPosts();
  }

  @Get('user/:autorId')
  getPostsByUserId(@Param('autorId') autorId: number): Promise<BlogPost[]> {
    return this.postsService.findPostsByUser(autorId);
  }

  @Put(':postId')
  updatePost(
    @Param('postId') postId: number,   // Preuzimanje postId iz URL parametra
    @Body('content') content: string   // Novi sadržaj posta iz tela zahteva
  ): Promise<BlogPost> {
    return this.postsService.updatePost(postId, content);
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
