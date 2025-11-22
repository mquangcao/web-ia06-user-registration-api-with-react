import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export interface SetupSwaggerOptions {
  swaggerTitle?: string;
  swaggerDescription?: string;
  swaggerVersion?: string;
  swaggerPath?: string;
}

export const setupSwagger = (
  app: INestApplication,
  appName: string,
  serverUrls?: string[],
  options: SetupSwaggerOptions = {},
) => {
  const configBuilder = new DocumentBuilder()
    .setTitle(options.swaggerTitle ?? `${appName} Documentation Swagger`)
    .setDescription(options.swaggerDescription ?? `${appName} Description`)
    .setVersion(options.swaggerVersion ?? '1.0')
    .addServer('/', 'Local machine')
    .addBearerAuth()
    .addGlobalParameters({
      name: 'x-visitor-id',
      in: 'header',
      schema: {
        type: 'string',
        example: 'swagger-document-visitor-id',
      },
    });
  if (serverUrls) {
    serverUrls.forEach((url) => configBuilder.addServer(url));
  }
  const config = configBuilder.build();

  const swaggerPath = options.swaggerPath ?? `/api/${appName}/docs`;

  const swaggerFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(swaggerPath, app, swaggerFactory, {
    explorer: true,
    swaggerOptions: {
      customSiteTitle: `${appName} API Documentation`,
      persistAuthorization: true,
      displayRequestDuration: true,
      docExpansion: 'list',
    },
  });
};
