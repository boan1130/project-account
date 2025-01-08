import { Request, Response } from "express";
import { Contorller } from "../abstract/Contorller";
import { ExpenseService } from "../Service/ExpenseService";

export class ExpenseContorller extends Contorller {
    protected service: ExpenseService;

    constructor() {
        super();
        this.service = new ExpenseService();
    }

    public async findAll(req: Request, res: Response): Promise<void> {
        const dbResp = await this.service.getAllExpenses();
        if (dbResp) {
            res.status(200).send({
                code: 200,
                message: "查詢成功",
                body: dbResp
            });
        } else {
            res.status(500).send({
                code: 500,
                message: "查詢失敗",
                body: undefined
            });
        }
    }

    public async insertOne(req: Request, res: Response): Promise<void> {
        try {
            const resp = await this.service.insertOne(req.body);
            res.status(resp.code).send(resp);
        } catch (error) {
            res.status(500).send({
                code: 500,
                message: "新增失敗",
                body: undefined
            });
        }
    }

    public async deleteById(req: Request, res: Response): Promise<void> {
        try {
            const resp = await this.service.deleteById(req.query.sid as string);
            res.status(resp.code).send(resp);
        } catch (error) {
            res.status(500).send({
                code: 500,
                message: "刪除失敗",
                body: undefined
            });
        }
    }

    public async updateById(req: Request, res: Response): Promise<void> {
        try {
            const { sid, ...updateData } = req.body;
            const resp = await this.service.updateById(id, updateData);
            res.status(resp.code).send(resp);
        } catch (error) {
            res.status(500).send({
                code: 500,
                message: "更新失敗",
                body: undefined
            });
        }
    }

    public async query(req: Request, res: Response): Promise<void> {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const resp = await this.service.findByPage(page, limit);
            res.status(200).send(resp);
        } catch (error) {
            res.status(500).send({
                code: 500,
                message: "查詢失敗",
                body: undefined
            });
        }
    }
}