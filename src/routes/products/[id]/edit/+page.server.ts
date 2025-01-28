import * as ProductModel from "$lib/server/models/product";
import * as ProductCategoryModel from "$lib/server/models/productCategory";
import { redirect } from "@sveltejs/kit";

export async function load({ params }) {
    const product = await ProductModel.findById(Number(params.id));
    const categories = await ProductCategoryModel.findAll();

    return { product, categories };
}
export const actions = {
    update: async ({ request, params }) => {
        const formData = await request.formData();
        const name = formData.get("name") as string;
        const categoryId = Number(formData.get("categoryId"));
        const basePrice = Number(formData.get("basePrice"));
        const id = Number(params.id);

        await ProductModel.update(id, { name, categoryId, basePrice });
        throw redirect(303, `/categories/${id}`);
    }
};