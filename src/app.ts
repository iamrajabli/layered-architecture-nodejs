import express, { Express } from 'express';
import { Server } from 'http';
import { LoggerService } from './logger/logger.service';

export class App {
    app: Express;
    port: number;
    server: Server;
    logger: LoggerService;
    
    constructor(logger: LoggerService) {
        this.app = express();
        this.port = 8080;
        this.logger = logger
        this.server = this.app.listen(this.port)
    }
    
    public async init() {
        this.logger.log(`Server created in http://127.0.0.1:${this.port}`)
    }
}