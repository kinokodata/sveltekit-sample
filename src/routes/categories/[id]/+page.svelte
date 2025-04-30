<script lang="ts">
    let { data } = $props();
</script>

<div class="container mx-auto p-6">
    <h1 class="text-2xl font-bold mb-6">商品カテゴリ</h1>

    {#if !data.category}
        <div class="bg-white rounded-lg shadow p-6">
            <h2 class="text-xl font-bold text-red-600 mb-4">該当データなし</h2>
            <p class="text-gray-600 mb-4">該当する商品カテゴリはありません。</p>
        </div>
    {:else}
        <div class="bg-white rounded-lg shadow p-6 mb-6">
            <h2 class="text-xl font-bold mb-4">
                {data.category.id}: {data.category.name}
            </h2>

            {#if data.category.description}
                <div class="bg-gray-50 rounded-lg p-4 mb-6">
                    <p class="text-gray-600 whitespace-pre-wrap">
                        {data.category.description}
                    </p>
                </div>
            {/if}

            <div class="flex items-center space-x-4">
                <a
                        href="/categories"
                        class="text-gray-600 hover:text-gray-800 font-medium"
                >
                    一覧に戻る
                </a>
                <a
                        href="/categories/{data.category.id}/edit"
                        class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                    編集
                </a>
                <form method="POST" action="?/delete" class="inline">
                    <input type="hidden" name="id" value={data.category.id}>
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