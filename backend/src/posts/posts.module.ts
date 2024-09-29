import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogPost } from './posts.entity';  // Uvezi Post entitet
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { User } from 'src/users/users.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([BlogPost, User])
  ],
  providers: [PostsService],
  controllers: [PostsController],
  exports: [TypeOrmModule]
})
export class PostsModule {}
