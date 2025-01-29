<script lang="ts">
    let { data } = $props();
</script>

<div class="container mx-auto p-6">
    <h1 class="text-2xl font-bold mb-6">商品カテゴリ一覧</h1>

    <a
            href="/categories/new"
            class="text-blue-600 hover:text-blue-800 font-medium"
    >
        商品カテゴリを追加
    </a>

    <ul class="space-y-4">
        {#each data.categories as category}
            <li class="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                <form method="POST" action="?/delete" class="flex justify-between w-full items-center">
                    <a
                            href="/categories/{category.id}"
                            class="text-blue-600 hover:text-blue-800 font-medium"
                    >
                        {category.name}
                    </a>
                    <input type="hidden" name="id" value={category.id}>
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