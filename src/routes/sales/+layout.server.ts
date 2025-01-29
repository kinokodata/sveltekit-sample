import * as SalesModel from "$lib/server/models/sales";
import * as ProductModel from "$lib/server/models/product";
import type {DailySales} from "$lib/types/sales";
import type {Product} from "$lib/types/product";

export async function load() {
    const dailySales = await SalesModel.findAll();
    const allProducts = await ProductModel.findAll();

    const dailySalesProducts: {productId: number, data: DailySales[]}[] =
            await Promise.all(
                allProducts.map(async product => {
                    const sales = await SalesModel.findSalesWhereProductId(product.id);
                    return {
                        productId: product.id,
                        data: sales as DailySales[]
                    };
                })
            );
    return { dailySales, dailySalesProducts, products: allProducts };
}
