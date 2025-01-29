<script lang="ts">
    let { data } = $props();
</script>

<div class="container mx-auto p-6">
    <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">商品カテゴリ一覧</h1>
        <a
                href="/categories/new"
                class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
        >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
            </svg>
            カテゴリを追加
        </a>
    </div>

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