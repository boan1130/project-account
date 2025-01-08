import { Request, Response } from "express";

export abstract class Contorller {
    protected abstract service: any;
    
    abstract findAll(req: Request, res: Response): Promise<void>;
    abstract insertOne(req: Request, res: Response): Promise<void>;
    abstract deleteById(req: Request, res: Response): Promise<void>;
    abstract updateById(req: Request, res: Response): Promise<void>;
    abstract query(req: Request, res: Response): Promise<void>;
}