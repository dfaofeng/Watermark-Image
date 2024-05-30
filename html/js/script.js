// let watermarkText = [
//     "C24303526BA3001", // ID
//     "孝南祝站普通汇聚机房(祝站人民路涵洞接头点)- 孝南 三汊普通汇聚新机房(祝站街接头点)", // 名称
//     "", // 纬度（只输入数字）
//     "", // 经度（只输入数字）
//     "孝感市孝南区长征路115号", // 地址
//     ""  // 当前时间（自动生成）
// ];
//
// let currentImage = null;
//
// // 初始化页面时加载本地存储的数据
// document.addEventListener('DOMContentLoaded', function() {
//     // 尝试从本地存储加载数据
//     for (let i = 0; i < watermarkText.length; i++) {
//         let savedValue = localStorage.getItem(`watermarkText${i}`);
//         if (savedValue !== null) {
//             document.getElementById(`watermarkText${i}`).value = savedValue;
//             watermarkText[i] = savedValue;
//         }
//     }
//     // 如果时间为空，设为当前时间
//     if (!watermarkText[5]) {
//         let date = new Date();
//         let formattedDate = date.getFullYear() + '-' +
//             ('0' + (date.getMonth() + 1)).slice(-2) + '-' +
//             ('0' + date.getDate()).slice(-2) + ' ' +
//             ('0' + date.getHours()).slice(-2) + ':' +
//             ('0' + date.getMinutes()).slice(-2) + ':' +
//             ('0' + date.getSeconds()).slice(-2);
//         document.getElementById('watermarkText5').value = formattedDate;
//         watermarkText[5] = formattedDate;
//     }
// });
// //获取输入框
// document.getElementById('imageInput').addEventListener('change', function(event) {
//     var files = event.target.files;
//     for (var i = 0; i < files.length; i++) {
//         var file = files[i];
//         var reader = new FileReader();
//         reader.onload = function(e) {
//             var img = new Image();
//             img.onload = function() {
//                 currentImage = img;
//                 var canvas = document.getElementById('outputCanvas');
//                 var ctx = canvas.getContext('2d');
//                 canvas.width = img.width;
//                 canvas.height = img.height;
//                 ctx.drawImage(img, 0, 0);
//                 drawWatermark(ctx, img.width, img.height);
//             };
//             img.src = e.target.result;
//         };
//         reader.readAsDataURL(file);
//     }
// });
// //更新水印文本
// function updateWatermarkText() {
//     for (let i = 0; i < watermarkText.length; i++) {
//         let inputVal = document.getElementById(`watermarkText${i}`).value;
//         localStorage.setItem(`watermarkText${i}`, inputVal); // 保存到本地存储
//         if (i === 2) { // 纬度
//             watermarkText[i] = "纬度：" + inputVal;
//         } else if (i === 3) { // 经度
//             watermarkText[i] = "经度：" + inputVal;
//         } else if (i === 5) { // 当前时间
//             let date = new Date();
//             watermarkText[i] = date.getFullYear() + '-' +
//                 ('0' + (date.getMonth() + 1)).slice(-2) + '-' +
//                 ('0' + date.getDate()).slice(-2) + ' ' +
//                 ('0' + date.getHours()).slice(-2) + ':' +
//                 ('0' + date.getMinutes()).slice(-2) + ':' +
//                 ('0' + date.getSeconds()).slice(-2);
//             document.getElementById(`watermarkText5`).value = watermarkText[i];
//             localStorage.setItem(`watermarkText5`, watermarkText[i]); // 保存到本地存储
//         } else {
//             watermarkText[i] = inputVal;
//         }
//     }
//     if (currentImage) {
//         var canvas = document.getElementById('outputCanvas');
//         var ctx = canvas.getContext('2d');
//         ctx.drawImage(currentImage, 0, 0);
//         drawWatermark(ctx, currentImage.width, currentImage.height);
//     } else {
//         alert("请先上传图片");
//     }
// }
//
// function drawWatermark(ctx, width, height) {
//     ctx.font = '14.8px CustomFont';
//     ctx.fillStyle = 'rgb(249,0,0)'; // 半透明红色
//
//     var paddingLeft = 21;  // 距离左边的距离
//     var paddingBottom = 36; // 距离底部的距离
//     var lineHeight = 28; // 行间距
//     var maxCharsPerLine = 25; // 每行的最大字符数
//
//     // 计算从底部开始的位置
//     var startY = height - paddingBottom;
//
//     // 处理第二行文本超过最大字符限制
//     let extendedWatermarkText = [...watermarkText];
//     let secondLine = extendedWatermarkText[1];
//     if (secondLine.length > maxCharsPerLine) {
//         let splitText = [];
//         for (let i = 0; i < secondLine.length; i += maxCharsPerLine) {
//             splitText.push(secondLine.slice(i, i + maxCharsPerLine));
//         }
//         extendedWatermarkText.splice(1, 1, ...splitText);
//     }
//
//     extendedWatermarkText.reverse().forEach(function(text, index) { // 从底部开始绘制
//         ctx.fillText(text, paddingLeft, startY - lineHeight * index);
//     });
//     extendedWatermarkText.reverse(); // 重新反转数组以恢复原顺序
// }
//
//


const watermarkText = [
    "C24303526BA3001", // ID
    "孝南祝站普通汇聚机房(祝站人民路涵洞接头点)- 孝南 三汊普通汇聚新机房(祝站街接头点)", // 名称
    "", // 纬度（只输入数字）
    "", // 经度（只输入数字）
    "孝感市孝南区长征路115号", // 地址
    "" // 当前时间（自动生成）
];
let currentImages = [];

// 初始化页面时加载本地存储的数据
document.addEventListener("DOMContentLoaded", () => {
    // 尝试从本地存储加载数据
    watermarkText.forEach((_, i) => {
        const savedValue = localStorage.getItem(`watermarkText${i}`);
        if (savedValue !== null) {
            document.getElementById(`watermarkText${i}`).value = savedValue;
            watermarkText[i] = savedValue;
        }
    });

    // 如果时间为空，设为当前时间
    if (!watermarkText[5]) {
        const date = new Date();
        const formattedDate = `${date.getFullYear()}-${(
            "0" +
            (date.getMonth() + 1)
        ).slice(-2)}-${("0" + date.getDate()).slice(-2)} ${(
            "0" + date.getHours()
        ).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}:${(
            "0" + date.getSeconds()
        ).slice(-2)}`;
        document.getElementById("watermarkText5").value = formattedDate;
        watermarkText[5] = formattedDate;
    }
});

// 获取输入框
// 获取输入框
document.getElementById("imageInput").addEventListener("change", (event) => {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                currentImage = img;
                const canvas = document.getElementById("outputCanvas");
                const ctx = canvas.getContext("2d");
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                drawWatermark(ctx, img.width, img.height);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});


// 更新水印文本
function updateWatermarkText() {
    watermarkText.forEach((_, i) => {
        const inputVal = document.getElementById(`watermarkText${i}`).value;
        localStorage.setItem(`watermarkText${i}`, inputVal); // 保存到本地存储
        if (i === 2 || i === 3) {
            // 纬度和经度
            watermarkText[i] = i === 2 ? `纬度：${inputVal}` : `经度：${inputVal}`;
        } else if (i === 5) {
            // 当前时间
            const date = new Date();
            const formattedDate = `${date.getFullYear()}-${(
                "0" +
                (date.getMonth() + 1)
            ).slice(-2)}-${("0" + date.getDate()).slice(-2)} ${(
                "0" + date.getHours()
            ).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}:${(
                "0" + date.getSeconds()
            ).slice(-2)}`;
            watermarkText[i] = formattedDate;
            document.getElementById(`watermarkText5`).value = formattedDate;
        } else {
            watermarkText[i] = inputVal;
        }
    });

    if (currentImage) {
        const canvas = document.getElementById("outputCanvas");
        const ctx = canvas.getContext("2d");
        ctx.drawImage(currentImage, 0, 0);
        drawWatermark(ctx, currentImage.width, currentImage.height);
    } else {
        alert("请先上传图片");
    }
}

// 绘制水印文本
function drawWatermark(ctx, width, height) {
    ctx.font = "14.8px CustomFont";
    ctx.fillStyle = "rgb(249,0,0)"; // 半透明红色

    const paddingLeft = 21; // 距离左边的距离
    const paddingBottom = 36; // 距离底部的距离
    const lineHeight = 28; // 行间距
    const maxCharsPerLine = 25; // 每行的最大字符数

    // 计算从底部开始的位置
    const startY = height - paddingBottom;

    // 处理文本超过最大字符限制的情况
    const extendedWatermarkText = [...watermarkText];
    const secondLine = extendedWatermarkText[1];
    if (secondLine.length > maxCharsPerLine) {
        const splitText = [];
        for (let i = 0; i < secondLine.length; i += maxCharsPerLine) {
            splitText.push(secondLine.slice(i, i + maxCharsPerLine));
        }
        extendedWatermarkText.splice(1, 1, ...splitText);
    }

    const lineCount = extendedWatermarkText.length; // 总行数
    extendedWatermarkText.forEach((text, index) => {
        // 从底部开始绘制
        const linePositionY = startY - lineHeight * (lineCount - index - 1);
        ctx.fillText(text, paddingLeft, linePositionY);
    });
}
