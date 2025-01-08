"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseContorller = void 0;
const Contorller_1 = require("../abstract/Contorller");
const ExpenseService_1 = require("../Service/ExpenseService");
class ExpenseContorller extends Contorller_1.Contorller {
    constructor() {
        super();
        this.service = new ExpenseService_1.ExpenseService();
    }
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const dbResp = yield this.service.getAllExpenses();
            if (dbResp) {
                res.status(200).send({
                    code: 200,
                    message: "查詢成功",
                    body: dbResp
                });
            }
            else {
                res.status(500).send({
                    code: 500,
                    message: "查詢失敗",
                    body: undefined
                });
            }
        });
    }
    insertOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield this.service.insertOne(req.body);
                res.status(resp.code).send(resp);
            }
            catch (error) {
                res.status(500).send({
                    code: 500,
                    message: "新增失敗",
                    body: undefined
                });
            }
        });
    }
    deleteById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield this.service.deleteById(req.query.id);
                res.status(resp.code).send(resp);
            }
            catch (error) {
                res.status(500).send({
                    code: 500,
                    message: "刪除失敗",
                    body: undefined
                });
            }
        });
    }
    updateById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _a = req.body, { id } = _a, updateData = __rest(_a, ["id"]);
                const resp = yield this.service.updateById(id, updateData);
                res.status(resp.code).send(resp);
            }
            catch (error) {
                res.status(500).send({
                    code: 500,
                    message: "更新失敗",
                    body: undefined
                });
            }
        });
    }
    query(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const page = parseInt(req.query.page) || 1;
                const limit = parseInt(req.query.limit) || 10;
                const resp = yield this.service.findByPage(page, limit);
                res.status(200).send(resp);
            }
            catch (error) {
                res.status(500).send({
                    code: 500,
                    message: "查詢失敗",
                    body: undefined
                });
            }
        });
    }
}
exports.ExpenseContorller = ExpenseContorller;
