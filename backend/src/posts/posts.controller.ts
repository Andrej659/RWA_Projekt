import { Controller, Post, Get, Delete, Body, Param, Put, UseGuards, Request } from '@nestjs/common';
import { PostsService } from './posts.service';
import { BlogPost } from './posts.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':username/create')
  async createPost(@Body() body: { title: string; content: string; }, @Request() req) {
    const username = req.user.username;
    return this.postsService.createPost(username, body.title, body.content);
  }


  @Get()
  async getAllPosts(): Promise<BlogPost[]> {
    return this.postsService.findAllPosts();
  }

  @UseGuards(JwtAuthGuard)
  @Get('posts/:postId')
  async getPost(@Param('postId') postId: number, @Request() req): Promise<any> {
    return this.postsService.getSinglePost(postId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':username/:postId')
  async getPostOfUser(@Param('postId') postId: number, @Request() req): Promise<BlogPost> {
    const username = req.user.username;
    return this.postsService.getPost(username, postId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':username')
  async getUserPosts(@Request() req) {
    const username = req.user.username; // ili req.user.sub, ovisno o payload-u
    console.log(username + " is authenticated");
    return this.postsService.findPostsByUserId(username); // Metoda za dohvatanje postova od korisnika
  }


  @UseGuards(JwtAuthGuard)
  @Put(':username/:postId/edit')
  async updatePost(
    @Param('postId') postId: number,   // Preuzimanje postId iz URL parametra
    @Body('title') title: string,
    @Body('content') content: string   // Novi sadržaj posta iz tela zahteva
  ): Promise<BlogPost> {
    return this.postsService.updatePost(postId, title, content);
  }


  @UseGuards(JwtAuthGuard)
  @Delete(':postId')
  deletePost(@Param('postId') postId: number): Promise<void> {
    return this.postsService.deletePost(postId);
  }

  @Post('posts/:postId/like')
  addLike(@Param('postId') postId: number): Promise<BlogPost> {
    console.log('Liked post'+ postId);  // Debugging logiranje
    return this.postsService.addLike(postId);
  }
}
