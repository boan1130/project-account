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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageContorller = void 0;
const Contorller_1 = require("../abstract/Contorller");
class PageContorller extends Contorller_1.Contorller {
    constructor() {
        super();
    }
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // 實作查詢所有頁面邏輯
        });
    }
    insertOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // 實作新增頁面邏輯
        });
    }
    deleteById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // 實作刪除頁面邏輯
        });
    }
    updateById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // 實作更新頁面邏輯
        });
    }
    query(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // 實作查詢頁面邏輯
        });
    }
}
exports.PageContorller = PageContorller;
