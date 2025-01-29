<script lang="ts">
    let { data } = $props();
</script>

<div class="container mx-auto p-6">
    <h1 class="text-2xl font-bold mb-6">商品一覧</h1>

    <a href="/products/new">商品を追加</a>

    <ul class="space-y-4">
        {#each data.products as product}
            <li class="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                <form method="POST" action="?/delete" class="flex justify-between w-full items-center">
                    <div class="flex flex-col">
                        <a
                                href="/products/{product.id}"
                                class="text-blue-600 hover:text-blue-800 font-medium"
                        >
                            {product.name}
                        </a>
                        <span class="text-sm text-gray-600">
                            カテゴリ: {product.category.name} |
                            価格: ¥{product.basePrice.toLocaleString()}
                        </span>
                    </div>
                    <input type="hidden" name="id" value={product.id}>
                    <button
                            type="submit"
                            class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                        削除
                    </button>
                </form>
            </li>
        {/each}
    </ul>
</div>