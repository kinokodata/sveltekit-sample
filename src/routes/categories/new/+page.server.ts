import * as ProductCategoryModel from "$lib/server/models/productCategory";
import { redirect } from "@sveltejs/kit";

export const actions = {
    create: async ({ request }) => {
        const formData = await request.formData();
        const name = formData.get("name") as string;
        const description = formData.get("description") as string;
        await ProductCategoryModel.create(name, description);
        throw redirect(303, "/categories");
    }
};