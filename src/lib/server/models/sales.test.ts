import { findSalesWhereProductId, findAll } from "./sales";

describe("日別売上モデル", () => {
    describe("findSalesWhereProductId", () => {
        test("商品IDに対応する売上データを正しく取得できる", async () => {
            // 既知の商品ID（サンプルデータのバニラアイス）で実行
            const result = await findSalesWhereProductId(1);

            // 売上データが配列で返ってくることを確認
            expect(Array.isArray(result)).toBe(true);

            // 少なくとも1件のデータがあることを確認
            expect(result.length).toBeGreaterThan(0);

            // 最初の売上データの構造を確認
            const firstSale = result[0];

            // DailySales型の構造チェック
            expect(typeof firstSale.id).toBe("number");
            expect(typeof firstSale.quantity).toBe("number");
            expect(typeof firstSale.totalAmount).toBe("number");
            expect(typeof firstSale.product.basePrice).toBe("number");
            expect(firstSale.saleDate.getFullYear()).toBeGreaterThan(1970);

            // Product型の構造チェック
            expect(typeof firstSale.product.id).toBe("number");
            expect(typeof firstSale.product.name).toBe("string");
            expect(typeof firstSale.product.basePrice).toBe("number");
            expect(firstSale.product.createdAt.getFullYear()).toBeGreaterThan(1970);

            // ProductCategory型の構造チェック
            expect(firstSale.product.category).toEqual(
                expect.objectContaining({
                    id: expect.any(Number),
                    name: expect.any(String),
                    description: expect.any(String),
                })
            );

            // 具体的な値のチェック
            expect(firstSale.product.id).toBe(1);  // バニラアイスのID
            expect(firstSale.product.name).toBe("バニラアイス");
            expect(firstSale.product.category.name).toBe("アイスクリーム・氷菓");
        });

        test("存在しない商品IDの場合は空配列を返す", async () => {
            const result = await findSalesWhereProductId(999);
            expect(result).toEqual([]);
        });

        test("不正な商品IDの場合はエラーになる", async () => {
            await expect(findSalesWhereProductId(-1)).rejects.toThrow();
        });
    });

    describe("findAll", () => {
        test("全ての売上データを正しく取得できる", async () => {
            const result = await findAll();

            // 配列で返ってくることを確認
            expect(Array.isArray(result)).toBe(true);

            // データが存在することを確認
            expect(result.length).toBeGreaterThan(0);

            // 最初の売上データの構造を確認
            const firstSale = result[0];

            // DailySales型の構造チェック
            expect(typeof firstSale.id).toBe("number");
            expect(typeof firstSale.quantity).toBe("number");
            expect(typeof firstSale.totalAmount).toBe("number");
            expect(typeof firstSale.product.basePrice).toBe("number");
            expect(firstSale.saleDate.getFullYear()).toBeGreaterThan(1970);

            // Product型の構造チェック
            expect(typeof firstSale.product.id).toBe("number");
            expect(typeof firstSale.product.name).toBe("string");
            expect(typeof firstSale.product.basePrice).toBe("number");
            expect(firstSale.product.createdAt.getFullYear()).toBeGreaterThan(1970);

            // ProductCategory型の構造チェック
            expect(firstSale.product.category).toEqual(
                expect.objectContaining({
                    id: expect.any(Number),
                    name: expect.any(String),
                    description: expect.any(String),
                })
            );
        });

        test("各売上データの数値フィールドが正しい型であることを確認", async () => {
            const result = await findAll();

            for (const sale of result) {
                // 数値フィールドの型チェック
                expect(typeof sale.id).toBe("number");
                expect(typeof sale.quantity).toBe("number");
                expect(typeof sale.totalAmount).toBe("number");
                expect(typeof sale.product.basePrice).toBe("number");

                // 有効な日付文字列であることを確認
                expect(sale.saleDate.getFullYear()).toBeGreaterThan(1970);
                expect(sale.product.createdAt.getFullYear()).toBeGreaterThan(1970);
            }
        });

        test("売上金額が数量と単価の積になっていることを確認", async () => {
            const result = await findAll();

            for (const sale of result) {
                // 許容誤差を考慮した比較（小数点の計算誤差対策）
                const expectedTotal = sale.quantity * sale.product.basePrice;
                expect(Math.abs(sale.totalAmount - expectedTotal)).toBeLessThan(0.01);
            }
        });

        test("全ての売上データが有効な商品カテゴリを持っていることを確認", async () => {
            const result = await findAll();

            for (const sale of result) {
                expect(sale.product.category).toBeTruthy();
                expect(sale.product.category.id).toBeGreaterThan(0);
                expect(sale.product.category.name).toBeTruthy();
            }
        });
    });
});
