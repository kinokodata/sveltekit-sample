import { findAll, findById, create, update, deleteById } from "$lib/server/models/productCategory";

describe("商品カテゴリモデル", () => {
    // テスト中に作成されたカテゴリのIDを保存する配列
    const createdCategoryIds: number[] = [];

    describe("create: 商品カテゴリの作成", () => {
        test("説明文付きの商品カテゴリを作成できる", async () => {
            const result = await create("テストカテゴリ", "テスト用の説明文");

            expect(result.name).toBe("テストカテゴリ");
            expect(result.description).toBe("テスト用の説明文");

            // 後続のテストのために ID を保存
            createdCategoryIds.push(result.id);
        });

        test("説明文なしでも商品カテゴリを作成できる", async () => {
            const result = await create("説明なしカテゴリ");
            expect(result.name).toBe("説明なしカテゴリ");
            expect(result.description).toBeNull();

            // 作成したIDを保存
            createdCategoryIds.push(result.id);
        });

        test("カテゴリ名が空の場合はエラーになる", async () => {
            await expect(create("")).rejects.toThrow();
        });
    });

    describe("findAll: 商品カテゴリ一覧の取得", () => {
        test("全ての商品カテゴリを取得できる", async () => {
            const categories = await findAll();
            expect(Array.isArray(categories)).toBe(true);
            expect(categories.length).toBeGreaterThan(0);

            const testCategory = categories.find(c => c.id === createdCategoryIds[0]);
            expect(testCategory).toBeDefined();
            expect(testCategory?.name).toBe("テストカテゴリ");
        });
    });

    describe("findById: 指定IDの商品カテゴリ取得", () => {
        test("指定したIDの商品カテゴリを取得できる", async () => {
            const category = await findById(createdCategoryIds[0]);
            expect(category).not.toBeNull();
            expect(category?.name).toBe("テストカテゴリ");
            expect(category?.description).toBe("テスト用の説明文");
        });

        test("存在しないIDの場合はnullを返す", async () => {
            const category = await findById(99999);
            expect(category).toBeNull();
        });
    });

    describe("update: 商品カテゴリの更新", () => {
        test("カテゴリ名を更新できる", async () => {
            const updated = await update(createdCategoryIds[0], { name: "更新後カテゴリ" });
            expect(updated.name).toBe("更新後カテゴリ");
            expect(updated.description).toBe("テスト用の説明文");
        });

        test("説明文を更新できる", async () => {
            const updated = await update(createdCategoryIds[0], { description: "更新後の説明文" });
            expect(updated.name).toBe("更新後カテゴリ");
            expect(updated.description).toBe("更新後の説明文");
        });

        test("カテゴリ名と説明文を同時に更新できる", async () => {
            const updated = await update(createdCategoryIds[0], {
                name: "最終カテゴリ名",
                description: "最終説明文"
            });
            expect(updated.name).toBe("最終カテゴリ名");
            expect(updated.description).toBe("最終説明文");
        });

        test("存在しないIDの場合はエラーになる", async () => {
            await expect(update(99999, { name: "無効な更新" })).rejects.toThrow();
        });
    });

    describe("deleteById: 商品カテゴリの削除", () => {
        test("商品が紐づくカテゴリは削除できない", async () => {
            // カテゴリID 1 は商品が紐づいているはず
            await expect(deleteById(1)).rejects.toThrow();
        });

        test("テスト用カテゴリを削除できる", async () => {
            // 2番目のテストカテゴリを削除テストに使用
            const idToDelete = createdCategoryIds[1];
            await expect(deleteById(idToDelete)).resolves.not.toThrow();

            const deleted = await findById(idToDelete);
            expect(deleted).toBeNull();

            // 削除したIDを配列から削除（後処理で重複削除しないため）
            const index = createdCategoryIds.indexOf(idToDelete);
            if (index > -1) {
                createdCategoryIds.splice(index, 1);
            }
        });
    });

    // 全てのテスト終了後に実行される後処理
    afterAll(async () => {
        // テスト中に作成したすべてのカテゴリを削除する
        for (const id of createdCategoryIds) {
            try {
                await deleteById(id);
            } catch (error) {
                console.warn(`テスト後処理: カテゴリID ${id} の削除に失敗しました`, error);
            }
        }
    });
});