import { Route } from "./abstract/Route";
import { PageRoute } from "./routers/pageRoute";
import { ExpenseRoute } from "./routers/ExpenseRoute";


export const router: Array<Route> = [
    new ExpenseRoute()
];