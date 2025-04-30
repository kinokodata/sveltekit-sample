<script lang="ts">
    let { data } = $props();
</script>

<div class="container mx-auto p-6">
    <h1 class="text-2xl font-bold mb-6">新規商品作成</h1>

    <div class="bg-white rounded-lg shadow p-6">
        <form method="POST" action="?/create" class="space-y-6">
            <div class="space-y-2">
                <label class="block font-medium text-gray-700">
                    商品名
                    <input
                            name="name"
                            type="text"
                            required
                            class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                    >
                </label>
            </div>

            <div class="space-y-2">
                <label class="block font-medium text-gray-700">
                    商品カテゴリ
                    <select
                            name="categoryId"
                            class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                    >
                        {#each data.categories as category}
                            <option value="{category.id}">{category.name}</option>
                        {/each}
                    </select>
                </label>
            </div>

            <div class="space-y-2">
                <label class="block font-medium text-gray-700">
                    ベース価格
                    <input
                            name="basePrice"
                            type="number"
                            required
                            class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                    >
                </label>
            </div>

            <div class="flex items-center space-x-4 pt-4">
                <a
                        href="/products"
                        class="text-gray-600 hover:text-gray-800 font-medium"
                >
                    キャンセル
                </a>
                <button
                        type="submit"
                        class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                    作成
                </button>
            </div>
        </form>
    </div>
</div>