<script lang="ts">
    import type {LayoutData} from "./$types";

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

<div class="container mx-auto p-6">
    <h1 class="text-2xl font-bold mb-6">売上データ</h1>

    <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="overflow-x-auto">
            <table class="w-full">
                <thead class="bg-gray-50">
                <tr>
                    {#each columns as column}
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {column.label}
                        </th>
                    {/each}
                </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                {#each dailySalesList as row}
                    <tr class="hover:bg-gray-50">
                        {#each columns as column}
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {row[column.key]}
                            </td>
                        {/each}
                    </tr>
                {/each}
                </tbody>
            </table>
        </div>
    </div>
</div>