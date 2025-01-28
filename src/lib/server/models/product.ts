import type { Product } from "$lib/types/product";
import { supabase } from "$lib/server/db/client";
import { error } from "@sveltejs/kit";

/**
 * 全商品を取得
 */
export async function findAll(): Promise<Product[]> {
    const { data, error: err } = await supabase
        .from("products")
        .select(`
            *,
            product_categories(*)
        `);

    if (err) {
        console.error("商品一覧の取得に失敗:", err);
        throw error(500, { message: "データの取得に失敗しました" });
    }

    if (!data) return [];

    return data.map(row => ({
        id: row.id,
        name: row.name,
        basePrice: row.base_price,
        createdAt: row.created_at,
        category: row.product_categories
    }));
}

/**
 * IDで商品を検索
 */
export async function findById(id: number): Promise<Product> {
    const { data, error: err } = await supabase
        .from("products")
        .select(`
            *,
            product_categories(*)
        `)
        .eq("id", id)
        .single();

    if (err) {
        console.error("商品の取得に失敗:", err);
        throw error(404, { message: "商品が見つかりません" });
    }

    return {
        id: data.id,
        name: data.name,
        basePrice: data.base_price,
        createdAt: data.created_at,
        category: data.product_categories
    };
}

/**
 * 新規商品を作成
 */
export async function create(name: string, categoryId: number, basePrice: number): Promise<Product> {
    const { data, error: err } = await supabase
        .from("products")
        .insert([{
            name,
            category_id: categoryId,
            base_price: basePrice
        }])
        .select(`
            *,
            product_categories(*)
        `)
        .single();

    if (err) {
        console.error("商品の作成に失敗:", err);
        throw error(500, { message: "商品の作成に失敗しました" });
    }

    return {
        id: data.id,
        name: data.name,
        basePrice: data.base_price,
        createdAt: data.created_at,
        category: data.product_categories
    };
}

/**
 * 商品を更新
 */
export async function update(
    id: number,
    { name, categoryId, basePrice }: { name?: string; categoryId?: number; basePrice?: number }
): Promise<Product> {
    const updateData: Record<string, unknown> = {};
    if (name) updateData.name = name;
    if (categoryId) updateData.category_id = categoryId;
    if (basePrice !== undefined) updateData.base_price = basePrice;

    const { data, error: err } = await supabase
        .from("products")
        .update(updateData)
        .eq("id", id)
        .select(`
            *,
            product_categories(*)
        `)
        .single();

    if (err) {
        console.error("商品の更新に失敗:", err);
        throw error(500, { message: "商品の更新に失敗しました" });
    }

    return {
        id: data.id,
        name: data.name,
        basePrice: data.base_price,
        createdAt: data.created_at,
        category: data.product_categories
    };
}

/**
 * 商品を削除
 */
export async function deleteById(id: number): Promise<void> {
    const { error: err } = await supabase
        .from("products")
        .delete()
        .eq("id", id);

    if (err) {
        console.error("商品の削除に失敗:", err);
        throw error(500, { message: "商品の削除に失敗しました" });
    }
}