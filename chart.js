document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('nutritionChart');
    
    if (ctx) {
        const chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['花青素(mg)', '维生素C(mg)', '膳食纤维(g)', '糖分(g)', '热量(kcal)'],
                datasets: [
                    {
                        label: '云南高原蓝莓',
                        data: [15.8, 9.7, 2.4, 10.2, 57],
                        backgroundColor: 'rgba(75, 108, 183, 0.7)',
                        borderColor: 'rgba(75, 108, 183, 1)',
                        borderWidth: 1
                    },
                    {
                        label: '苹果',
                        data: [0.1, 4.6, 2.4, 13.8, 52],
                        backgroundColor: 'rgba(231, 76, 60, 0.7)',
                        borderColor: 'rgba(231, 76, 60, 1)',
                        borderWidth: 1
                    },
                    {
                        label: '香蕉',
                        data: [0.3, 8.7, 2.6, 12.2, 89],
                        backgroundColor: 'rgba(241, 196, 15, 0.7)',
                        borderColor: 'rgba(241, 196, 15, 1)',
                        borderWidth: 1
                    },
                    {
                        label: '橙子',
                        data: [0.2, 53.2, 2.4, 9.4, 47],
                        backgroundColor: 'rgba(230, 126, 34, 0.7)',
                        borderColor: 'rgba(230, 126, 34, 1)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    legend: {
                        position: 'bottom',
                    }
                }
            }
        });
    }
});