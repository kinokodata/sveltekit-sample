<script lang="ts">
    let { data } = $props();
</script>

<h1>商品カテゴリ一覧</h1>

<ul>
    {#each data.categories as category}
        <li>
            <form method="POST" action="?/delete">
                <a href="/categories/{category.id}">{category.name}</a>
                <input type="hidden" name="id" value={category.id}>
                <button type="submit">削除</button>
            </form>
        </li>
    {/each}
</ul>
