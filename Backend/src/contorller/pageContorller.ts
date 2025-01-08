import { Request, Response } from "express";
import { Contorller } from "../abstract/Contorller";

export class PageContorller extends Contorller {
    protected service: any; // 如果有 PageService 則可以替換為具體的服務

    constructor() {
        super();
    }

    public async findAll(req: Request, res: Response): Promise<void> {
        // 實作查詢所有頁面邏輯
    }

    public async insertOne(req: Request, res: Response): Promise<void> {
        // 實作新增頁面邏輯
    }

    public async deleteById(req: Request, res: Response): Promise<void> {
        // 實作刪除頁面邏輯
    }

    public async updateById(req: Request, res: Response): Promise<void> {
        // 實作更新頁面邏輯
    }

    public async query(req: Request, res: Response): Promise<void> {
        // 實作查詢頁面邏輯
    }
}