import type { ProductCategory } from "$lib/types/productCategory";
import { supabase } from "$lib/server/db/client";
import { error } from "@sveltejs/kit";

/**
 * 全商品カテゴリを取得
 */
export async function findAll(): Promise<ProductCategory[]> {
    const { data, error: err } = await supabase
        .from("product_categories")
        .select("*");

    if (err) {
        console.error("商品カテゴリ一覧の取得に失敗:", err);
        throw error(500, { message: "データの取得に失敗しました" });
    }

    return data || [];
}

/**
 * IDで商品カテゴリを検索
 */
export async function findById(id: number): Promise<ProductCategory | null> {
    const { data, error: err } = await supabase
        .from("product_categories")
        .select("*")
        .eq("id", id)
        .single();

    if (err) {
        console.error("商品カテゴリの取得に失敗:", err);
        return null;
    }

    return data;
}

/**
 * 新規商品カテゴリを作成
 */
export async function create(name: string, description?: string): Promise<ProductCategory> {
    // 名前が空文字またはスペースのみの場合はエラー
    if (!name || !name.trim()) {
        throw error(400, { message: "カテゴリ名は必須です" });
    }

    const { data, error: err } = await supabase
        .from("product_categories")
        .insert([{ name: name.trim(), description }])
        .select()
        .single();

    if (err) {
        console.error("商品カテゴリの作成に失敗:", err);
        throw error(500, { message: "商品カテゴリの作成に失敗しました" });
    }

    return data;
}

/**
 * 商品カテゴリを更新
 */
export async function update(
    id: number,
    { name, description }: { name?: string; description?: string }
): Promise<ProductCategory> {
    const updateData: Record<string, unknown> = {};
    if (name) updateData.name = name;
    if (description !== undefined) updateData.description = description;

    const { data, error: err } = await supabase
        .from("product_categories")
        .update(updateData)
        .eq("id", id)
        .select()
        .single();

    if (err) {
        console.error("商品カテゴリの更新に失敗:", err);
        throw error(500, { message: "商品カテゴリの更新に失敗しました" });
    }

    return data;
}

/**
 * 商品カテゴリを削除
 */
export async function deleteById(id: number): Promise<void> {
    const { error: err } = await supabase
        .from("product_categories")
        .delete()
        .eq("id", id);

    if (err) {
        console.error("商品カテゴリの削除に失敗:", err);
        // 外部キー制約違反の場合は409エラー
        if (err.code === "23503") {
            throw error(409, { message: "このカテゴリに属する商品が存在するため削除できません" });
        }
        throw error(500, { message: "商品カテゴリの削除に失敗しました" });
    }
}