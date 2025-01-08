"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const expenseSchema = new mongoose_1.default.Schema({
    sid: {
        type: Number,
        required: [true, '序號必填']
    },
    name: {
        type: String,
        required: [true, '品項名稱必填']
    },
    price: {
        type: String,
        required: [true, '價格必填'],
        min: [0, '價格不能小於0']
    },
    remark: {
        type: String,
        default: ''
    },
    // createDate: { 
    //     type: Date,
    //     default: Date.now
    // }
});
exports.ExpenseModel = mongoose_1.default.model('expenses', expenseSchema);
