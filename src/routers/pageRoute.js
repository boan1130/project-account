"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageRoute = void 0;
const express_1 = require("express");
const pageContorller_1 = require("../contorller/pageContorller");
const Route_1 = require("../abstract/Route");
class PageRoute extends Route_1.Route {
    constructor() {
        super();
        this.router = (0, express_1.Router)();
        this.Controller = new pageContorller_1.PageContorller();
        this.setRoutes();
        this.url = '/expense';
    }
    setRoutes() {
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
exports.PageRoute = PageRoute;
