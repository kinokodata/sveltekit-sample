import type {Product} from "$lib/types/product";
import type {ProductCategory} from "$lib/types/productCategory";

export interface DailySales {
    id: number;                 // ID
    saleDate: Date;             // 売上日（日付文字列）
    product: Product;           // 商品
    quantity: number;           // 売上個数
    totalAmount: number;        // 売上額
}