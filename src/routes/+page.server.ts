import { redirect } from '@sveltejs/kit';

export function load() {
    throw redirect(308, '/sales/analysis');  // /products ページにリダイレクト
}