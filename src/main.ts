import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { EntityNotFoundExceptionFilter } from './exception-filters/entity-not-found.exception-filter';
import { HttpExceptionFilter } from './exception-filters/entity-unauthorized.exception-filter';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new EntityNotFoundExceptionFilter(), new HttpExceptionFilter());

  const options = new DocumentBuilder()
    .setTitle('Nest.Js API')
    .setDescription('Documentation Nest.Js API')
    .build()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api', app, document)

  await app.listen(3333);
}
bootstrap();
