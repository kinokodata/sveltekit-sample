<script lang="ts">
    let { data } = $props();
</script>

<h1>商品カテゴリ</h1>

{#if !data.category}
    <h2>該当データなし</h2>

    <p>該当する商品カテゴリはありません。</p>
{:else}
    <h2>{data.category.id}: {data.category.name}</h2>

    <p>{data.category.description}</p>
{/if}

<a href="/categories">一覧に戻る</a>　<a href="/categories/{data.category.id}/edit">編集</a>
<form method="POST" action="?/delete">
    <input type="hidden" name="id" value={data.category.id}>
    <button type="submit">削除</button>
</form>