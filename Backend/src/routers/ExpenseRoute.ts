// routers/ExpenseRoute.ts
import { Router, Request, Response } from 'express';
import { ExpenseContorller } from '../contorller/ExpenseContorller';
import { Route } from '../abstract/Route';
import { Contorller } from '../abstract/Contorller';

export class ExpenseRoute extends Route {
    protected url: string;
    public router: Router;
    protected  Controller: ExpenseContorller;

    constructor() {
        super();
        this.router = Router();
        this.Controller = new ExpenseContorller();
        this.setRoutes();
        this.url = '/expense';
    }

    public setRoutes(): void {
        this.router.get('/all', (req: Request, res: Response) => 
            this.Controller.findAll(req, res)
        );
        
        this.router.post('/add', (req: Request, res: Response) => 
            this.Controller.insertOne(req, res)
        );
        
        this.router.delete('/delete', (req: Request, res: Response) => 
            this.Controller.deleteById(req, res)
        );
        
        this.router.put('/update', (req: Request, res: Response) => 
            this.Controller.updateById(req, res)
        );
        
        
    }
}