import { findAll, findById, create, update, deleteById } from "$lib/server/models/product";

describe("商品モデル", () => {
    let testProductId: number;

    describe("create: 商品の作成", () => {
        test("商品を作成できる", async () => {
            const result = await create("テスト商品", 1, 500);

            expect(result.name).toBe("テスト商品");
            expect(result.basePrice).toBe(500);
            expect(result.category).toBeDefined();
            expect(result.category.id).toBe(1);

            // 後続のテストのために ID を保存
            testProductId = result.id;
        });

        test("存在しないカテゴリIDの場合はエラーになる", async () => {
            await expect(create("エラー商品", 999, 500)).rejects.toThrow();
        });

        test("不正な金額の場合はエラーになる", async () => {
            await expect(create("エラー商品", 1, -500)).rejects.toThrow();
            await expect(create("エラー商品", 1, 0)).rejects.toThrow();
        });

        test("空の商品名の場合はエラーになる", async () => {
            await expect(create("", 1, 500)).rejects.toThrow();
            await expect(create("   ", 1, 500)).rejects.toThrow();
        });

        test("不正なカテゴリIDの場合はエラーになる", async () => {
            await expect(create("エラー商品", 0, 500)).rejects.toThrow();
            await expect(create("エラー商品", -1, 500)).rejects.toThrow();
        });
    });

    describe("findAll: 商品一覧の取得", () => {
        test("全ての商品を取得できる", async () => {
            const products = await findAll();
            expect(Array.isArray(products)).toBe(true);
            expect(products.length).toBeGreaterThan(0);

            // テスト用に作成した商品が含まれているか確認
            const testProduct = products.find(p => p.id === testProductId);
            expect(testProduct).toBeDefined();
            expect(testProduct?.name).toBe("テスト商品");
        });

        test("各商品が正しいカテゴリ情報を持っている", async () => {
            const products = await findAll();

            for (const product of products) {
                expect(product.category).toBeDefined();
                expect(product.category.id).toBeGreaterThan(0);
                expect(product.category.name).toBeDefined();
            }
        });

        test("各商品が必要な属性を持っている", async () => {
            const products = await findAll();

            for (const product of products) {
                expect(typeof product.id).toBe("number");
                expect(typeof product.name).toBe("string");
                expect(typeof product.basePrice).toBe("number");
                expect(product.createdAt).toBeDefined();
            }
        });
    });

    describe("findById: 指定IDの商品取得", () => {
        test("指定したIDの商品を取得できる", async () => {
            const product = await findById(testProductId);
            expect(product.name).toBe("テスト商品");
            expect(product.basePrice).toBe(500);
            expect(product.category).toBeDefined();
            expect(product.category.id).toBe(1);
        });

        test("存在しないIDの場合はエラーになる", async () => {
            await expect(findById(99999)).rejects.toThrow();
        });
    });

    describe("update: 商品の更新", () => {
        test("商品名を更新できる", async () => {
            const updated = await update(testProductId, { name: "更新後商品" });
            expect(updated.name).toBe("更新後商品");
            expect(updated.basePrice).toBe(500);
            expect(updated.category.id).toBe(1);
        });

        test("価格を更新できる", async () => {
            const updated = await update(testProductId, { basePrice: 1000 });
            expect(updated.name).toBe("更新後商品");
            expect(updated.basePrice).toBe(1000);
            expect(updated.category.id).toBe(1);
        });

        test("カテゴリを更新できる", async () => {
            const updated = await update(testProductId, { categoryId: 2 });
            expect(updated.name).toBe("更新後商品");
            expect(updated.basePrice).toBe(1000);
            expect(updated.category.id).toBe(2);
        });

        test("複数の属性を同時に更新できる", async () => {
            const updated = await update(testProductId, {
                name: "最終商品名",
                basePrice: 1500,
                categoryId: 1
            });
            expect(updated.name).toBe("最終商品名");
            expect(updated.basePrice).toBe(1500);
            expect(updated.category.id).toBe(1);
        });

        test("存在しないIDの場合はエラーになる", async () => {
            await expect(update(99999, { name: '無効な更新' })).rejects.toThrow();
        });

        test('存在しないカテゴリIDの場合はエラーになる', async () => {
            await expect(update(testProductId, { categoryId: 999 })).rejects.toThrow();
        });
    });

    describe('deleteById: 商品の削除', () => {
        test('テスト用商品を削除できる', async () => {
            await expect(deleteById(testProductId)).resolves.not.toThrow();
            await expect(findById(testProductId)).rejects.toThrow();
        });

        test('存在しないIDの場合はエラーになる', async () => {
            await expect(deleteById(99999)).rejects.toThrow();
        });
    });
});