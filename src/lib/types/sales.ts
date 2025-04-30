import type {Product} from "$lib/types/product";

export interface DailySales {
    id: number;                 // ID
    saleDate: Date;             // 売上日
    product: Product;           // 商品
    quantity: number;           // 売上個数
    totalAmount: number;        // 売上額
}