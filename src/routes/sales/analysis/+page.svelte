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
    let productCheckBoxes = dailySalesProducts.map(v => {
        return {
            productId: v.productId,
            checked: false,
            data: v.data
        };
    });

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

<div>
    <h3>表示する商品</h3>
    <div>
        {#each productCheckBoxes as box}
            <label>
                <input
                        type="checkbox"
                        checked={box.checked}
                        on:change={() => handleCheckboxChange(box.productId)}
                />
                {box.data[0].product.name}
            </label>
        {/each}
    </div>
</div>

<canvas id="productSalesChart"></canvas>