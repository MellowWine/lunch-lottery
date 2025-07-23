<template>
    <div class="lottery-container">
        <h1>今天午饭吃什么？</h1>

        <div class="result-display" :class="{ 'is-rolling': isDrawing }">
            <h2>{{ result || '???' }}</h2>
        </div>

        <button @click="startLottery" :disabled="isDrawing">
            {{ isDrawing ? '正在决定...' : '开始抽签' }}
        </button>
    </div>
</template>

<script setup>
import { ref } from 'vue';

// 我们的午餐备选列表，你可以随意增删
const lunchOptions = [
    '兰州拉面', '沙县小吃', '黄焖鸡米饭', '肯德基', '麦当劳',
    '猪脚饭', '螺蛳粉', '麻辣烫', '轻食沙拉', '潮汕牛肉火锅',
    '日式咖喱饭', '韩式拌饭', '重庆小面', '肠粉', '寿司',
    '酸菜鱼', '外卖随便点一个', '自己做饭', '泡面加个蛋', '楼下便利店'
];

// 使用 ref 创建响应式数据
const result = ref(''); // 抽签结果
const isDrawing = ref(false); // 是否正在抽签的状态
let intervalId = null; // 用于存储定时器ID

// 开始抽签的方法
const startLottery = () => {
    // 如果正在抽签，则不执行任何操作
    if (isDrawing.value) return;

    isDrawing.value = true;
    result.value = ''; // 清空上次结果

    // 动画效果：快速切换选项
    // 每 100 毫秒随机显示一个选项
    intervalId = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * lunchOptions.length);
        result.value = lunchOptions[randomIndex];
    }, 100);

    // 3秒后停止动画，并选出最终结果
    setTimeout(() => {
        clearInterval(intervalId); // 清除定时器

        // 选出最终结果
        const finalRandomIndex = Math.floor(Math.random() * lunchOptions.length);
        result.value = `就吃【${lunchOptions[finalRandomIndex]}】啦！`;

        isDrawing.value = false; // 结束抽签状态
    }, 3000); // 3000毫秒 = 3秒
};
</script>

<style scoped>
.lottery-container {
    max-width: 500px;
    margin: 50px auto;
    padding: 30px;
    text-align: center;
    background-color: #f9f9f9;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    font-family: 'Helvetica Neue', Arial, sans-serif;
}

h1 {
    color: #333;
    margin-bottom: 30px;
}

.result-display {
    min-height: 100px;
    margin: 30px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    border: 2px dashed #ccc;
    border-radius: 10px;
}

.result-display h2 {
    font-size: 2.5em;
    color: #e67e22;
    /* 添加一个简单的过渡效果 */
    transition: all 0.1s ease-in-out;
}

/* 抽签滚动时的动画 */
.result-display.is-rolling h2 {
    animation: text-roll 0.1s infinite;
}

@keyframes text-roll {
    0% {
        transform: translateY(-5px) scale(1.05);
        opacity: 0.8;
    }

    100% {
        transform: translateY(5px) scale(1);
        opacity: 1;
    }
}

button {
    padding: 12px 30px;
    font-size: 1.2em;
    color: #fff;
    background: linear-gradient(45deg, #f39c12, #e67e22);
    border: none;
    border-radius: 30px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

button:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(230, 126, 34, 0.4);
}

button:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

button:disabled {
    background: #ccc;
    cursor: not-allowed;
    box-shadow: none;
}
</style>