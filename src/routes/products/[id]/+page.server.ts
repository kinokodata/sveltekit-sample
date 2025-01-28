import {findById} from "$lib/server/models/product";
import * as ProductModel from "$lib/server/models/product";
import {redirect} from "@sveltejs/kit";

export async function load ({ params }) {
    const id = parseInt(params.id);
    const product = await findById(id);
    return { product };
}

export const actions = {
    // 削除アクション
    delete: async ({ request }) => {
        const formData = await request.formData();
        const id = Number(formData.get("id"));
        await ProductModel.deleteById(id);
        throw redirect(303, "/products");
    }
};