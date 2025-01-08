import { Service } from "../abstract/Service";
import { DBResp } from "../interfaces/DBResp";
import { ExpenseRecord } from "../interfaces/ExpenseRecord";
import { ExpenseModel } from "../orm/schemas/expenseSchema/expenseSchema";


export class ExpenseService extends Service {
    public async getAllExpenses(): Promise<Array<ExpenseRecord>> {
        try {
            return await ExpenseModel.find()
        } catch (error) {
            console.error("取得花費記錄錯誤:", error);
            throw error;
        }
    }

    public async insertOne(info: ExpenseRecord): Promise<DBResp<ExpenseRecord>> {
        try {
            const expense = new ExpenseModel({
                sid: info.sid,
                name: info.name,
                price: info.price,
                remark: info.remark,
                createDate: new Date()
            });
            const result = await expense.save();
            return {
                code: 200,
                message: "新增成功",
                body: result
            };
        } catch (error) {
            if (error instanceof Error && error.name === 'ValidationError') {
                return {
                    code: 400,
                    message: error.message,
                    body: undefined
                };
            }
            throw error;
        }
    }

    public async deleteById(sid: string): Promise<DBResp<any>> {
        try {
            const result = await ExpenseModel.deleteOne({ sid: sid });;
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
        } catch (error) {
            throw error;
        }
    }

    public async updateById(sid: string, updateData: Partial<ExpenseRecord>): Promise<DBResp<ExpenseRecord>> {
        try {
            const result = await ExpenseModel.updateOne(
                { sid: sid },
                updateData
            );
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
        } catch (error) {
            throw error;
        }
    }

    public async findByPage(page: number, limit: number): Promise<DBResp<{
        records: ExpenseRecord[];
        total: number;
        page: number;
        totalPages: number;
    }>> {
        try {
            const skip = (page - 1) * limit;
            const total = await ExpenseModel.countDocuments();
            const records = await ExpenseModel.find({})
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
        } catch (error) {
            throw error;
        }
    }

    public async importFromCSV(data: ExpenseRecord[]): Promise<DBResp<{ success: number; failed: number }>> {
        try {
            const results = await ExpenseModel.insertMany(data, { ordered: false });
            return {
                code: 200,
                message: "匯入成功",
                body: {
                    success: results.length,
                    failed: data.length - results.length
                }
            };
        } catch (error) {
            throw error;
        }
    }

    public async getStatistics(): Promise<DBResp<{
        totalAmount: number;
        avgAmount: number;
        maxExpense: ExpenseRecord;
        minExpense: ExpenseRecord;
    }>> {
        try {
            const [stats] = await ExpenseModel.aggregate([
                {
                    $group: {
                        _id: null,
                        totalAmount: { $sum: "$price" },
                        avgAmount: { $avg: "$price" }
                    }
                }
            ]);

            const maxExpense = await ExpenseModel.findOne().sort({ price: -1 }).limit(1);
            const minExpense = await ExpenseModel.findOne().sort({ price: 1 }).limit(1);

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
        } catch (error) {
            throw error;
        }
    }
}