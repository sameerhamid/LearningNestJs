import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import googleOAuthConfig from '../config/google.oauth.config';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google-oauth') {
  constructor(
    @Inject(googleOAuthConfig.KEY)
    private googleConfiguration: ConfigType<typeof googleOAuthConfig>,
    private authService: AuthService,
  ) {
    super({
      clientID: googleConfiguration.clientID ?? '',
      clientSecret: googleConfiguration.clientSecret ?? '',
      callbackURL: googleConfiguration.callbackURL ?? '',
      scope: ['email', 'profile'],
    });
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ) {
    const user = await this.authService.validateGoogleUser({
      email: profile.emails[0].value,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      avatarUrl: profile.photos[0].value,
      password: '',
    });
    // console.log('user>>>', user);
    // console.log('profile>>>', profile);
    done(null, user);
  }
}
