import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EntityNotFoundFilter } from './entity-not-found/entity-not-found.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Register the global exception filter
  app.useGlobalFilters(new EntityNotFoundFilter());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
