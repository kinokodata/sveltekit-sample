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
    // バリデーション
    if (!name || !name.trim()) {
        throw error(400, { message: "商品名は必須です" });
    }
    if (basePrice <= 0) {
        throw error(400, { message: "価格は0より大きい値を指定してください" });
    }
    if (categoryId <= 0) {
        throw error(400, { message: "有効なカテゴリIDを指定してください" });
    }

    const { data, error: err } = await supabase
        .from("products")
        .insert([{
            name: name.trim(),
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
    if (name) {
        if (!name.trim()) {
            throw error(400, { message: "商品名は必須です" });
        }
        updateData.name = name.trim();
    }
    if (categoryId !== undefined) {
        if (categoryId <= 0) {
            throw error(400, { message: "有効なカテゴリIDを指定してください" });
        }
        updateData.category_id = categoryId;
    }
    if (basePrice !== undefined) {
        if (basePrice <= 0) {
            throw error(400, { message: "価格は0より大きい値を指定してください" });
        }
        updateData.base_price = basePrice;
    }

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
    // 削除前に商品の存在確認
    const { data: existingProduct, error: findErr } = await supabase
        .from("products")
        .select()
        .eq("id", id)
        .single();

    if (findErr || !existingProduct) {
        throw error(404, { message: "指定された商品が見つかりません" });
    }

    const { error: err } = await supabase
        .from("products")
        .delete()
        .eq("id", id);

    if (err) {
        console.error("商品の削除に失敗:", err);
        throw error(500, { message: "商品の削除に失敗しました" });
    }
}