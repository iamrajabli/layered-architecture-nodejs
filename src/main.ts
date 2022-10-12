import { ExceptionFilter } from './errors/exception.filter';
import { UserController } from './users/users.controller';
import { App } from './app';

import { LoggerService } from './logger/logger.service';

async function bootstrap() {
    const logger = new LoggerService();

    await new App(
        logger,
        new UserController(logger),
        new ExceptionFilter(logger))
        .init()

}

bootstrap()