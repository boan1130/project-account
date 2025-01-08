import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
    sid: { 
        type: String,
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

export const ExpenseModel = mongoose.model('expenses', expenseSchema);