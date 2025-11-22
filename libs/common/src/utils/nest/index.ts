import { INestApplication, Logger } from '@nestjs/common';
import { setupSwagger } from '../../docs';
import { getConfig } from '../config';

export interface SetupBootstrapOptions {
  swaggerTitle?: string;
  swaggerDescription?: string;
  swaggerVersion?: string;
  swaggerPath?: string;
  listenPort?: number;
  listenHost?: string;
  logLevel?: 'log' | 'error' | 'warn' | 'debug' | 'verbose';
}

export async function setupBootstrap(
  app: INestApplication<any>,
  options: SetupBootstrapOptions = {},
  serverUrls?: string[],
) {
  const logger = new Logger('Bootstrap');
  app.enableShutdownHooks();
  app.enableCors();

  const timeZone = getConfig('core.defaultTimeZone') || 'Asia/Bangkok';
  process.env.TZ = timeZone;

  const d = new Date().toTimeString();

  logger.verbose(`Current UTC Timezone: ${timeZone}: ${d}`);

  const appName = 'appName';

  setupSwagger(app, appName, serverUrls, {
    swaggerTitle: options.swaggerTitle,
    swaggerDescription: options.swaggerDescription,
    swaggerVersion: options.swaggerVersion,
    swaggerPath: options.swaggerPath,
  });

  const port = options.listenPort ?? getConfig<number>('port');
  const host = options.listenHost ?? getConfig<string>('host', '0.0.0.0');

  await Promise.all([app.listen(port, host)]).then(async () => {
    const url = await app.getUrl();
    console.log(
      [
        `=====================`,
        `Application is running on: ${url}`,
        `Api document on: ${url}${options.swaggerPath}`,
        `=====================`,
      ].join('\n'),
    );
  });
}
