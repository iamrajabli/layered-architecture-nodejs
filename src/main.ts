import { App } from './app';

import { LoggerService } from './logger/logger.service';

async function bootstrap() {
    await new App(new LoggerService()).init()

}

bootstrap()