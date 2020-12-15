import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { EntityNotFoundExceptionFilter } from './exception-filters/entity-not-found.exception-filter';
import { HttpExceptionFilter } from './exception-filters/http-exception-filter';
import { Container } from 'typedi';
import { useContainer, Validator } from 'class-validator';
import { winstonConfig } from 'config/winston.config';
import { WinstonModule } from 'nest-winston';

async function bootstrap() {

  const logger = WinstonModule.createLogger(winstonConfig);
  const app = await NestFactory.create(AppModule, {
    logger: process.env.NODE_ENV == 'production' ?
      logger : ['debug', 'verbose', 'warn', 'error']
  });

  useContainer(Container);

  const options = new DocumentBuilder()
    .setTitle('Nest.Js API')
    .setDescription('Documentation Nest.Js API')
    .build()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api', app, document)

  console.log('PORT', process.env.PORT);
  await app.listen(parseInt(process.env.PORT) || 3000, process.env.HOST || '0.0.0.0');
}
bootstrap();
