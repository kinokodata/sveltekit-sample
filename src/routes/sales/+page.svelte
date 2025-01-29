<script lang="ts">
    import type {LayoutData} from "../../../.svelte-kit/types/src/routes/$types";

    export let data: LayoutData;

    const columns = [
        { key: "date", label: "日付" },
        { key: "productName", label: "商品名" },
        { key: "categoryName", label: "カテゴリ" },
        { key: "basePrice", label: "単価" },
        { key: "quantity", label: "数量" },
        { key: "totalAmount", label: "売上金額" }
    ];

    const dailySalesList = data.dailySales.map(item => ({
            date: new Date(item.saleDate).toLocaleDateString("ja-JP"),
            productName: item.product.name,
            categoryName: item.product.category.name,
            basePrice: item.product.basePrice.toLocaleString(),
            quantity: item.quantity.toLocaleString(),
            totalAmount: `¥${item.totalAmount.toLocaleString()}`
        }));

</script>

<div>
    <h1>売上データ</h1>
    <table>
        <thead>
        <tr>
            {#each columns as column}
                <th>{column.label}</th>
            {/each}
        </tr>
        </thead>
        <tbody>
        {#each dailySalesList as row}
            <tr>
                {#each columns as column}
                    <td>{row[column.key]}</td>
                {/each}
            </tr>
        {/each}
        </tbody>
    </table>
</div>

<style>
    table {
        width: 100%;
        border-collapse: collapse;
    }
    th, td {
        padding: 8px;
        text-align: left;
        border-bottom: 1px solid #ddd;
    }
    label {
        margin-right: 1rem;
    }
    div {
        margin-bottom: 1rem;
    }
</style>