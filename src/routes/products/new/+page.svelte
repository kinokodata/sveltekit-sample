<script lang="ts">
    let { data } = $props();
</script>

<h1>新規商品作成</h1>
<form method="POST" action="?/create">
    <div>
        <label>
            商品名
            <input
                    name="name"
                    type="text"
                    required
            >
        </label>
    </div>

    <div>
        <label>
            商品カテゴリ
            <select
                    name="categoryId"
            >
                {#each data.categories as category}
                    <option value="{category.id}">{category.name}</option>
                {/each}
            </select>
        </label>
    </div>

    <div>
        <label>
            ベース価格
            <input
                    name="basePrice"
                    type="number"
                    required
            >
        </label>
    </div>

    <div>
        <a href="/products">キャンセル</a>
        <button type="submit">作成</button>
    </div>
</form>
