<script lang="ts">
    let { data } = $props();
</script>

<h1>商品一覧</h1>

<a href="/priducts/new">商品を追加</a>

<ul>
    {#each data.products as product}
        <li>
            <form method="POST" action="?/delete">
                <a href="/products/{product.id}">{product.name}</a>
                <input type="hidden" name="id" value={product.id}>
                <button type="submit">削除</button>
            </form>
        </li>
    {/each}
</ul>
