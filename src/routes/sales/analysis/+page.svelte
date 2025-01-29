<script lang="ts">
    import { onMount } from 'svelte';
    import type { LayoutData } from "../../../../.svelte-kit/types/src/routes/$types";
    import * as cjs from "chart.js/auto";
    import type {DailySales} from "$lib/types/sales";

    export let data: LayoutData;

    // 色のバリエーション配列を追加
    const colors = [
        'rgb(75, 192, 192)',   // ティール
        'rgb(255, 99, 132)',   // ピンク
        'rgb(255, 159, 64)',   // オレンジ
        'rgb(54, 162, 235)',   // 青
        'rgb(153, 102, 255)',  // 紫
        'rgb(255, 205, 86)'   // 黄色
    ];

    let dailySalesProducts: {productId: number, data: DailySales[]}[] = data.dailySalesProducts;

    let productCheckBoxes: {productId: number, checked: boolean, data: DailySales[]}[];

    let salesChart: cjs.Chart;

    function updateChart() {
        const filteredDailySalesProducts = productCheckBoxes.filter(v => v.checked);
        if(filteredDailySalesProducts.length === 0) {
            if (salesChart) {
                salesChart.data.labels = [];
                salesChart.data.datasets = [];
                salesChart.update();
            }
            return;
        }

        // グラフの更新
        salesChart.data.labels = filteredDailySalesProducts[0].data.map(aDailySales =>
            new Date(aDailySales.saleDate).toLocaleDateString('ja-JP')
        );
        salesChart.data.datasets = filteredDailySalesProducts.map((productSales, index) => {
            return {
                label: productSales.data[0].product.name,
                data: productSales.data.map(sales => sales.totalAmount),
                borderColor: colors[index % colors.length],
                backgroundColor: colors[index % colors.length],
                tension: 0.1
            };
        });
        salesChart.update();
    }

    onMount(() => {
        productCheckBoxes = dailySalesProducts.map(v => {
            return {
                productId: v.productId,
                checked: false,
                data: v.data
            };
        });

        salesChart = new cjs.Chart(
            document.getElementById("productSalesChart") as HTMLCanvasElement,
            {
                type: 'line',
                data: {
                    labels: [],
                    datasets: []
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: '商品別売上推移'
                        }
                    },
                    scales: {
                        y: {
                            title: {
                                display: true,
                                text: '売上金額（円）'
                            }
                        }
                    }
                }
            }
        );
    });

    function handleCheckboxChange(productId: number) {
        productCheckBoxes = productCheckBoxes.map(box =>
            box.productId === productId
                ? { ...box, checked: !box.checked }
                : box
        );
        updateChart();
    }
</script>

<div class="container mx-auto p-6">
    <div class="bg-white rounded-lg shadow p-6 mb-6">
        <h3 class="text-lg font-bold mb-4">表示する商品</h3>
        <div class="flex flex-wrap gap-4 mb-6">
            {#each productCheckBoxes as box}
                <label class="flex items-center space-x-2 bg-gray-50 px-4 py-2 rounded-lg hover:bg-gray-100 cursor-pointer">
                    <input
                            type="checkbox"
                            checked={box.checked}
                            on:change={() => handleCheckboxChange(box.productId)}
                            class="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <span class="text-gray-700">{box.data[0].product.name}</span>
                </label>
            {/each}
        </div>
    </div>

    <div class="bg-white rounded-lg shadow p-6" style="height: 70vh">
        <canvas id="productSalesChart"></canvas>
    </div>
</div>