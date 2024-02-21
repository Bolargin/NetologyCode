import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { MongoExceptionFilter } from './common/filter';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bodyParser: true,
    cors: true,
  });
  app.useGlobalFilters(new MongoExceptionFilter());
  app.setGlobalPrefix(process.env.API_PREFIX);
  app.useStaticAssets(join(process.cwd(), 'public'));
  const sessionMiddleware = session({
    secret: process.env.AUTH_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 10 * 60 * 1000,
    },
  });
  app.use(sessionMiddleware);
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(process.env.HTTP_PORT);
}
bootstrap();
