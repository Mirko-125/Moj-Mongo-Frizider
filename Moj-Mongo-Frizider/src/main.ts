import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    cookieSession({
      name: 'session',
      keys: ['secretkey'],
      cookie: {
        sameSite: 'none' as const,
        secure: true,
      }
    }),
  );
  app.enableCors({origin: 'http://localhost:5173', credentials: true});
  await app.listen(3000);
}
bootstrap();
