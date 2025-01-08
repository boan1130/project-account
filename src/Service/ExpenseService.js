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
exports.ExpenseService = void 0;
const Service_1 = require("../abstract/Service");
const expenseSchema_1 = require("../orm/schemas/expenseSchema/expenseSchema");
class ExpenseService extends Service_1.Service {
    getAllExpenses() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield expenseSchema_1.ExpenseModel.find();
            }
            catch (error) {
                console.error("取得花費記錄錯誤:", error);
                throw error;
            }
        });
    }
    insertOne(info) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const expense = new expenseSchema_1.ExpenseModel({
                    sid: info.sid,
                    name: info.name,
                    price: info.price,
                    remark: info.remark,
                    createDate: new Date()
                });
                const result = yield expense.save();
                return {
                    code: 200,
                    message: "新增成功",
                    body: result
                };
            }
            catch (error) {
                if (error instanceof Error && error.name === 'ValidationError') {
                    return {
                        code: 400,
                        message: error.message,
                        body: undefined
                    };
                }
                throw error;
            }
        });
    }
    deleteById(sid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield expenseSchema_1.ExpenseModel.findByIdAndDelete(sid);
                if (!result) {
                    return {
                        code: 404,
                        message: "找不到該筆記錄",
                        body: undefined
                    };
                }
                return {
                    code: 200,
                    message: "刪除成功",
                    body: result
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateById(sid, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield expenseSchema_1.ExpenseModel.findByIdAndUpdate(sid, updateData, { new: true });
                if (!result) {
                    return {
                        code: 404,
                        message: "找不到該筆記錄",
                        body: undefined
                    };
                }
                return {
                    code: 200,
                    message: "更新成功",
                    body: result
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    findByPage(page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const skip = (page - 1) * limit;
                const total = yield expenseSchema_1.ExpenseModel.countDocuments();
                const records = yield expenseSchema_1.ExpenseModel.find({})
                    .sort({ createDate: -1 })
                    .skip(skip)
                    .limit(limit);
                return {
                    code: 200,
                    message: "查詢成功",
                    body: {
                        records,
                        total,
                        page,
                        totalPages: Math.ceil(total / limit)
                    }
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    importFromCSV(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const results = yield expenseSchema_1.ExpenseModel.insertMany(data, { ordered: false });
                return {
                    code: 200,
                    message: "匯入成功",
                    body: {
                        success: results.length,
                        failed: data.length - results.length
                    }
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    getStatistics() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [stats] = yield expenseSchema_1.ExpenseModel.aggregate([
                    {
                        $group: {
                            _id: null,
                            totalAmount: { $sum: "$price" },
                            avgAmount: { $avg: "$price" }
                        }
                    }
                ]);
                const maxExpense = yield expenseSchema_1.ExpenseModel.findOne().sort({ price: -1 }).limit(1);
                const minExpense = yield expenseSchema_1.ExpenseModel.findOne().sort({ price: 1 }).limit(1);
                return {
                    code: 200,
                    message: "統計成功",
                    body: {
                        totalAmount: stats.totalAmount,
                        avgAmount: Math.round(stats.avgAmount),
                        maxExpense,
                        minExpense
                    }
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.ExpenseService = ExpenseService;
