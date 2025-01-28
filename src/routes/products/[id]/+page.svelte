<script lang="ts">
    let { data } = $props();
</script>

<h1>商品</h1>

{#if !data.product}
    <h2>該当データなし</h2>

    <p>該当する商品はありません。</p>
{:else}
    <h2>{data.product.id}: {data.product.name}</h2>

    <p>カテゴリ：{data.product.category.name}</p>
    <p>価格：{data.product.basePrice}</p>
{/if}

<a href="/products">一覧に戻る</a>
<form method="POST" action="?/delete">
    <input type="hidden" name="id" value={data.product.id}>
    <button type="submit">削除</button>
</form>