"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseRoute = void 0;
// routers/ExpenseRoute.ts
const express_1 = require("express");
const ExpenseContorller_1 = require("../contorller/ExpenseContorller");
const Route_1 = require("../abstract/Route");
class ExpenseRoute extends Route_1.Route {
    constructor() {
        super();
        this.router = (0, express_1.Router)();
        this.Controller = new ExpenseContorller_1.ExpenseContorller();
        this.setRoutes();
        this.url = '/expense';
    }
    setRoutes() {
        this.router.get('/all', (req, res) => this.Controller.findAll(req, res));
        this.router.post('/add', (req, res) => this.Controller.insertOne(req, res));
        this.router.delete('/delete', (req, res) => this.Controller.deleteById(req, res));
        this.router.put('/update', (req, res) => this.Controller.updateById(req, res));
    }
}
exports.ExpenseRoute = ExpenseRoute;
