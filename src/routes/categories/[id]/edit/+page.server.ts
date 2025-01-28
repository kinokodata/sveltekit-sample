import * as ProductCategoryModel from '$lib/server/models/productCategory';
import { redirect } from '@sveltejs/kit';

export async function load({ params }) {
    const category = await ProductCategoryModel.findById(Number(params.id));
    return { category };
}

export const actions = {
    update: async ({ request, params }) => {
        const formData = await request.formData();
        const name = formData.get('name') as string;
        const description = formData.get('description') as string;
        const id = Number(params.id);

        await ProductCategoryModel.update(id, { name, description });
        throw redirect(303, `/categories/${id}`);
    }
};