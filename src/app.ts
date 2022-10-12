import { UserController } from './users/users.controller';
import express, { Express } from 'express';
import { Server } from 'http';
import { LoggerService } from './logger/logger.service';
import { ExceptionFilter } from './errors/exception.filter';

export class App {
    app: Express;
    port: number;
    server: Server;
    logger: LoggerService;
    userController: UserController;
    exceptionFilter: ExceptionFilter

    constructor(
        logger: LoggerService,
        userController: UserController,
        exceptionFilter: ExceptionFilter
    ) {
        this.app = express();
        this.port = 8080;
        this.logger = logger;
        this.userController = userController;
        this.exceptionFilter = exceptionFilter;
    }

    public useRoutes() {
        this.app.use('/users', this.userController.router);
    }

    useExceptionFilters() {
        this.app.use(this.exceptionFilter.catch.bind(this))
    }

    public async init() {
        this.useRoutes();
        this.useExceptionFilters();
        this.server = this.app.listen(this.port);
        this.logger.log(`Server created in http://127.0.0.1:${this.port}`);
    }
}