import {findById} from "$lib/server/models/productCategory";
import * as ProductCategoryModel from "$lib/server/models/productCategory";
import {redirect} from "@sveltejs/kit";

export async function load ({ params }) {
    const id = parseInt(params.id);
    const category = await findById(id);
    return { category };
}

export const actions = {
    // 削除アクション
    delete: async ({ request }) => {
        const formData = await request.formData();
        const id = Number(formData.get("id"));
        await ProductCategoryModel.deleteById(id);
        throw redirect(303, "/categories");
    }
};