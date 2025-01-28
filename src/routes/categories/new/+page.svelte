<h1>新規カテゴリ作成</h1>
<form method="POST" action="?/create">
    <div>
        <label>
            カテゴリ名
            <input
                    name="name"
                    type="text"
                    required
            >
        </label>
    </div>

    <div>
        <label>
            説明
            <textarea
                    name="description"
                    rows="3"
            ></textarea>
        </label>
    </div>

    <div>
        <a href="/product-categories">キャンセル</a>
        <button type="submit">作成</button>
    </div>
</form>
