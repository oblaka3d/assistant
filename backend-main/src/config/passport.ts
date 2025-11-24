import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as YandexStrategy } from 'passport-yandex';

import { findOrCreateOAuthUser, OAuthProfile } from '../services/oauthService';

import { config } from './index';

// Сериализация пользователя для сессии
// eslint-disable-next-line @typescript-eslint/no-explicit-any
passport.serializeUser((user: any, done: any) => {
  done(null, user.id);
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
passport.deserializeUser(async (id: string, done: any) => {
  try {
    const { User } = await import('../models/User');
    const user = await User.findById(id);
    done(null, user || undefined);
  } catch (error) {
    done(error as Error, undefined);
  }
});

// Google OAuth Strategy
if (config.oauth.google.clientID && config.oauth.google.clientSecret) {
  passport.use(
    'google',
    new GoogleStrategy(
      {
        clientID: config.oauth.google.clientID,
        clientSecret: config.oauth.google.clientSecret,
        callbackURL: config.oauth.google.callbackURL,
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      async (_accessToken: string, _refreshToken: string, profile: any, done: any) => {
        try {
          const oauthProfile: OAuthProfile = {
            id: profile.id,
            email: profile.emails?.[0]?.value || '',
            name: profile.displayName || profile.name?.givenName || 'User',
            picture: profile.photos?.[0]?.value,
          };

          const result = await findOrCreateOAuthUser('google', oauthProfile);
          done(null, { id: result.user.id, ...result });
        } catch (error) {
          done(error as Error, undefined);
        }
      }
    )
  );
  console.log('✅ Google OAuth strategy registered');
} else {
  console.warn(
    '⚠️  Google OAuth strategy not registered: missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET'
  );
}

// Yandex OAuth Strategy
if (config.oauth.yandex.clientID && config.oauth.yandex.clientSecret) {
  passport.use(
    'yandex',
    new YandexStrategy(
      {
        clientID: config.oauth.yandex.clientID,
        clientSecret: config.oauth.yandex.clientSecret,
        callbackURL: config.oauth.yandex.callbackURL,
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      async (_accessToken: string, _refreshToken: string, profile: any, done: any) => {
        try {
          const oauthProfile: OAuthProfile = {
            id: profile.id,
            email: profile.emails?.[0]?.value || '',
            name: profile.displayName || profile.realName || 'User',
            picture: profile.photos?.[0]?.value,
          };

          const result = await findOrCreateOAuthUser('yandex', oauthProfile);
          done(null, { id: result.user.id, ...result });
        } catch (error) {
          done(error as Error, undefined);
        }
      }
    )
  );
  console.log('✅ Yandex OAuth strategy registered');
} else {
  console.warn(
    '⚠️  Yandex OAuth strategy not registered: missing YANDEX_CLIENT_ID or YANDEX_CLIENT_SECRET'
  );
}

// GitHub OAuth Strategy
if (config.oauth.github.clientID && config.oauth.github.clientSecret) {
  passport.use(
    'github',
    new GitHubStrategy(
      {
        clientID: config.oauth.github.clientID,
        clientSecret: config.oauth.github.clientSecret,
        callbackURL: config.oauth.github.callbackURL,
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      async (_accessToken: string, _refreshToken: string, profile: any, done: any) => {
        try {
          const oauthProfile: OAuthProfile = {
            id: profile.id.toString(),
            email: profile.emails?.[0]?.value || `${profile.username}@github.local`,
            name: profile.displayName || profile.username || 'User',
            picture: profile.photos?.[0]?.value,
          };

          const result = await findOrCreateOAuthUser('github', oauthProfile);
          done(null, { id: result.user.id, ...result });
        } catch (error) {
          done(error as Error, undefined);
        }
      }
    )
  );
  console.log('✅ GitHub OAuth strategy registered');
} else {
  console.warn(
    '⚠️  GitHub OAuth strategy not registered: missing GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET'
  );
}

export default passport;
