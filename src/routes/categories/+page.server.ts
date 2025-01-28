import {findAll} from "$lib/server/models/productCategory";
import * as ProductCategoryModel from "$lib/server/models/productCategory";
import {redirect} from "@sveltejs/kit";

export async function load() {
    const categories = await findAll();
    return { categories };
}

export const actions = {
    // 削除アクション
    delete: async ({ request }) => {
        const formData = await request.formData();
        const id = Number(formData.get('id'));
        await ProductCategoryModel.deleteById(id);
        throw redirect(303, '/categories');
    }
};