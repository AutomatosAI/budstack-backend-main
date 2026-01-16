import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthRepository } from 'src/auth/auth.repository';
import { VerifyCallback } from 'jsonwebtoken';
import { MESSAGES } from 'src/constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly authRepository: AuthRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET_LOGIN, // Replace with your actual secret key
    });
  }

  async validate(payload: any, done: VerifyCallback) {
    const user: any = await this.authRepository.getUser({
      where: { id: payload.id },
      select: {
        id: true,
        walletAddress: true,
        email: true,
        role: true,
      }
    });
    if (!user) {
      throw new UnauthorizedException(MESSAGES.ERROR.ACCESS_DENIED);
    }

    done(null, user);
  }
}