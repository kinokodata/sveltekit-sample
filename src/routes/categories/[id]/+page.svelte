<script lang="ts">
    let { data } = $props();
</script>

<h1>商品カテゴリ</h1>

<h2>{data.category.id}: {data.category.name}</h2>

<p>{data.category.description}</p>