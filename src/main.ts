import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { PrismaClientExceptionFilter } from 'prisma/prisma-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes( //* validation pipe global
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.useGlobalFilters(new PrismaClientExceptionFilter());

  const config = new DocumentBuilder()
  .setTitle('Task Manager API')
  .setDescription('Task Manager API with CRUD for Users, CRUD for Tasks and a CRUD to add comments to Tasks. This API includes validations and authorizations modules. Previous tested with ThunderClient and Postman, start by registering and logging to generate your token to perform actions')
  .setVersion('1.0')
  .addTag('tasks')
  .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
