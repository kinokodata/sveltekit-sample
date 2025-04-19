import { redirect } from "@sveltejs/kit";

export function load() {
    throw redirect(302, "/sales/analysis");  // sales/analysis ページにリダイレクト
}