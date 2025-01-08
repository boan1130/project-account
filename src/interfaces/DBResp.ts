export interface DBResp<T = any> {
    code: number;
    message: string;
    body?: T;
}