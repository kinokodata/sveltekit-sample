<script lang="ts">
    let { data } = $props();
</script>

<h1>カテゴリ編集</h1>

<form method="POST" action="?/update">
    <div>
        <label>
            カテゴリ名
            <input
                    name="name"
                    type="text"
                    required
                    value={data.category.name}
            >
        </label>
    </div>

    <div>
        <label>
            説明
            <textarea
                    name="description"
                    rows="3"
            >{data.category.description || ""}</textarea>
        </label>
    </div>

    <div>
        <a href="/categories/{data.category.id}">キャンセル</a>
        <button type="submit">更新</button>
    </div>
</form>
