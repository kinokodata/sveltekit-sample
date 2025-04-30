<script lang="ts">
    let { data } = $props();
</script>

<div class="container mx-auto p-6">
    <h1 class="text-2xl font-bold mb-6">商品</h1>

    {#if !data.product}
        <div class="bg-white rounded-lg shadow p-6">
            <h2 class="text-xl font-bold text-red-600 mb-4">該当データなし</h2>
            <p class="text-gray-600 mb-4">該当する商品はありません。</p>
        </div>
    {:else}
        <div class="bg-white rounded-lg shadow p-6 mb-6">
            <h2 class="text-xl font-bold mb-4">
                {data.product.id}: {data.product.name}
            </h2>

            <div class="space-y-3 mb-6">
                <p class="flex items-center text-gray-600">
                    <span class="font-medium w-24">カテゴリ：</span>
                    <span>{data.product.category.name}</span>
                </p>
                <p class="flex items-center text-gray-600">
                    <span class="font-medium w-24">価格：</span>
                    <span>¥{data.product.basePrice.toLocaleString()}</span>
                </p>
            </div>

            <div class="flex items-center space-x-4">
                <a
                        href="/products"
                        class="text-gray-600 hover:text-gray-800 font-medium"
                >
                    一覧に戻る
                </a>
                <a
                        href="/products/{data.product.id}/edit"
                        class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                    編集
                </a>
                <form method="POST" action="?/delete" class="inline">
                    <input type="hidden" name="id" value={data.product.id}>
                    <button
                            type="submit"
                            class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                        削除
                    </button>
                </form>
            </div>
        </div>
    {/if}
</div>