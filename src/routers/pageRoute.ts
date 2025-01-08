import { Router, Request, Response } from 'express';
import { PageContorller } from '../contorller/pageContorller';
import { Route } from '../abstract/Route';
import { Contorller } from '../abstract/Contorller';


export class PageRoute extends Route {
    protected url: string;
    protected Controller: PageContorller;
    public router: Router;
    constructor() {
        super();
        this.router = Router();
        this.Controller = new PageContorller();
        this.setRoutes();
        this.url = '/expense';
    }

    protected setRoutes(): void {
        // this.router.get('/all', (req: Request, res: Response) => 
        //     this.Controller.findAll(req, res)
        // );
        
        // this.router.post('/add', (req: Request, res: Response) => 
        //     this.Controller.insertOne(req, res)
        // );
        
        // this.router.delete('/delete', (req: Request, res: Response) => 
        //     this.Controller.deleteById(req, res)
        // );
        
        // this.router.put('/update', (req: Request, res: Response) => 
        //     this.Controller.updateById(req, res)
        // );
        
        // this.router.get('/query', (req: Request, res: Response) => 
        //     this.Controller.query(req, res)
        // );
    }
}