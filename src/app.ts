import { UserController } from './users/users.controller';
import express, { Express } from 'express';
import { Server } from 'http';
import { LoggerService } from './logger/logger.service';

export class App {
    app: Express;
    port: number;
    server: Server;
    logger: LoggerService;
    userController: UserController;

    constructor(logger: LoggerService, userController: UserController) {
        this.app = express();
        this.port = 8080;
        this.logger = logger
        this.userController = userController
    }
    
    public useRoutes() {
        this.app.use('/users', this.userController.router)
    }

    public async init() {
        this.server = this.app.listen(this.port)
        this.logger.log(`Server created in http://127.0.0.1:${this.port}`)
    }
}