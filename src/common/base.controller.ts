import { IControllerRoute } from './route.interface';
import { Router, Response } from "express";
import { LoggerService } from "../logger/logger.service";

export abstract class BaseController {
    private readonly _router: Router;
    logger: LoggerService;

    constructor(logger: LoggerService) {
        this.logger = logger;
        this._router = Router();
    }

    get router() {
        return this._router;
    }

    public send<T>(res: Response, code: number, message: T) {
        res.type('application/json');
        return res.status(code).json(message)
    }

    public ok<T>(res: Response, message: T) {
        this.send<T>(res, 200, message)
    }

    public created(res: Response) {
        res.sendStatus(201);
    }


    protected bindRoutes(routes: IControllerRoute[]) {
        for (const route of routes) {
            this.logger.log(`[${route.method}] ${route.path}`)
            this.router[route.method](route.path, route.func.bind(this))
        }
    }
}