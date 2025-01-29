<script>
    import '../app.css';
</script>

<div class="flex min-h-screen">
    <!-- Menu -->
    <div class="w-64 bg-gray-800 text-white p-6">
        <h1 class="text-2xl font-bold mb-8">売上分析ツール</h1>

        <nav class="space-y-4">
            <a href="/sales/analysis" class="block hover:bg-gray-700 p-2 rounded-lg transition-colors">
                <span>売上分析</span>
            </a>
            <a href="/sales" class="block hover:bg-gray-700 p-2 rounded-lg transition-colors">
                <span>売上</span>
            </a>
            <a href="/categories" class="block hover:bg-gray-700 p-2 rounded-lg transition-colors">
                <span>商品カテゴリ</span>
            </a>
            <a href="/products" class="block hover:bg-gray-700 p-2 rounded-lg transition-colors">
                <span>商品</span>
            </a>
        </nav>
    </div>

    <!-- Main Content -->
    <div class="flex-1 p-8 bg-gray-100">
        <slot />
    </div>
</div>