export interface ExpenseRecord {
    _id?: string;
    sid: string;      // 序號
    name: string;     // 品項名稱
    price: number;    // 價格
    remark: string;   // 備註說明(地點/商店)
}