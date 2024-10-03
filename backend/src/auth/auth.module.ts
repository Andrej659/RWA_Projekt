import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module'; // Ako imaš Users modul
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { UsersService } from 'src/users/users.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    forwardRef(() => UsersModule), // Importiraj Users modul
    PassportModule, // Passport modul za rad sa strategijama
    JwtModule.register({
      secret: 'tajna_kljuc', // Postavi tajni ključ
      signOptions: { expiresIn: '600s' }, // Postavi trajanje tokena
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy], // Registracija servisa i strategija
  exports: [AuthService], // Exportaj AuthService kako bi ga mogli koristiti drugi moduli
})
export class AuthModule {}
