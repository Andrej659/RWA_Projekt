import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from './users.entity';


@Injectable()
export class UsersService {

  constructor( 
    @InjectRepository(User)
  private usersRepository: Repository<User>
) {}

  // Register a new user
  async register(username: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);  // Heširanje lozinke pre spremanja
    const newUser = this.usersRepository.create({ username, password: hashedPassword });
    return this.usersRepository.save(newUser);
  }

  // Log in the user
  async findByUsername(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { username } });
  }

  async deleteByUsername(username: string): Promise<void> {
    const user = await this.findByUsername(username);  // Pronađi korisnika po imenu
    if (user) {
      await this.usersRepository.delete({ username });  // Brišemo korisnika
    }
  }
}
