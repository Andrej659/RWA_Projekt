import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsController } from './posts/posts.controller';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { DataSource } from 'typeorm';
import { BlogPost } from './posts/posts.entity';
import { User } from './users/users.entity';
import { PostsService } from './posts/posts.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'minelord123',
      database: 'rwa_projekt_db',
      entities: [BlogPost, User],
      synchronize: true,
    }),
    PostsModule,
    UsersModule
  ],
  controllers: [AppController, PostsController, UsersController],
  providers: [AppService, PostsService, UsersService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
