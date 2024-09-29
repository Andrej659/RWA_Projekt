import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogPost } from './posts.entity';  // Uvezi Post entitet
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([BlogPost])
  ],
  providers: [PostsService],
  controllers: [PostsController],
  exports: [TypeOrmModule]
})
export class PostsModule {}
