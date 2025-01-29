import type { ProductCategory } from "$lib/types/productCategory";
import { supabase } from "$lib/server/db/client";
import { error } from "@sveltejs/kit";
import type {Product} from "$lib/types/product";
import type {DailySales} from "$lib/types/sales";

/**
 * 日別売上を取得
 */
export async function findAll(): Promise<DailySales[]> {
    const { data, error: err } = await supabase
        .from("daily_sales")
        .select(`*,
            products(
                *,
                product_categories(*)
            )
        `);

    if (err) {
        console.error("日別売上一覧の取得に失敗:", err);
        throw error(500, { message: "データの取得に失敗しました" });
    }

    return data.map(row => {
        return {
            id: row.id,
            saleDate: row.sale_date,
            product: {
                    id: row.products.id,
                    name: row.products.name,
                    basePrice: row.products.base_price,
                    createdAt: row.products.created_at,
                    category: {
                        id: row.products.product_categories.id,
                        name: row.products.product_categories.name,
                        description: row.products.product_categories.description
                    } as ProductCategory
            } as Product,
            quantity: row.quantity,
            totalAmount: row.products.base_price * row.quantity
        } as DailySales;
    }) ?? [];
}

export async function findSalesWhereProductId(productId: number): Promise<DailySales[]> {
    if (productId < 0) {
        console.error("invalid productId:");
        throw error(400, { message: "商品IDの値が不正です" });
    }

    const { data, error: err } = await supabase
        .from("daily_sales")
        .select(`
            *,
            product:product_id (
                *,
                category:product_categories(*)
            )
        `)
        .eq("product_id", productId);

    if(!data) {
        return [];
    }

    if (err) {
        console.error("日別売上一覧の取得に失敗:", err);
        throw error(500, { message: "データの取得に失敗しました" });
    }

    return data.map(row => {
        return {
            id: row.id,
            saleDate: row.sale_date,
            product: {
                id: row.product.id,
                name: row.product.name,
                basePrice: row.product.base_price,
                createdAt: row.product.created_at,
                category: {
                    id: row.product.category.id,
                    name: row.product.category.name,
                    description: row.product.category.description
                } as ProductCategory
            } as Product,
            quantity: row.quantity,
            totalAmount: row.product.base_price * row.quantity
        } as DailySales;
    }) ?? [];
}