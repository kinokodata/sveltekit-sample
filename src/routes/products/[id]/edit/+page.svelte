<script lang="ts">
    let { data } = $props();
</script>

<h1>商品編集</h1>

<form method="POST" action="?/update">
    <div>
        <label>
            商品名
            <input
                    name="name"
                    type="text"
                    required
                    value={data.product.name}
            >
        </label>
    </div>

    <div>
        <label>
            商品カテゴリ
            <select
                    name="categoryId"
                    value="{data.product.category.id}"
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
                    value={data.product.name}
            >
        </label>
    </div>

    <div>
        <a href="/products/{data.product.id}">キャンセル</a>
        <button type="submit">更新</button>
    </div>
</form>
