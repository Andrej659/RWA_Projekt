import { Controller, Post, Get, Delete, Body, Param, Patch } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post(':username/create')
  createPost(@Body() body: { title: string, content: string, author: string }) {
    return this.postsService.addPost(body.title, body.content, body.author);
  }

  @Get()
  getPosts() {
    return this.postsService.getPosts();
  }

  @Get(':username')
  getUserPosts(@Param('username') username: string) {
    var temp = this.postsService.getUserPosts(username);
    return temp;
  }

  @Get(':username/:id')
  getPost(@Param('id') postId: number) {
    var temp = this.postsService.getPost(postId);
    return temp;
  }

  @Patch(':username/:id/edit')
  updatePost(
        @Param('username') username: string,
        @Param('id') postId: number,
        @Body() body: { title: string, content: string}) {
    return this.postsService.editPost({
        id: postId,
        title: body.title,
        content: body.content,
        author: username || 'Anonymous',
    });
  }

  @Delete(':id')
  deletePost(@Param('id') postId: number) {
    return this.postsService.deletePost(postId);
  }
}
