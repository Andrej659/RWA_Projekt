import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'tajna_kljuc', // isti tajni ključ kao i u `auth.module.ts`
    });
  }

  async validate(payload: any) {
    return { title: payload.title, username: payload.username, content: payload.content };
  }
}