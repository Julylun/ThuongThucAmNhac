export {
    showChart,
    getChart,
    destroyChart
}

import * as Time from '../../Features/common/time.js'
import SongChart from './class/SongChart.class.js'

let data = null
let config = null
let ctx = document.getElementById('chartBar').getContext('2d')

let song_1 = new SongChart('Ngay Ly di', [1, 2, 40, 4, 5, 6, 7, 88, 9, 10, 11,12])
let song_2 = new SongChart('Ngay Ly di', [1, 2, 80, 4, 5, 120, 7, 88, 9, 10, 11,40])
let song_3 = new SongChart('Ngay Ly di', [1, 2, 3, 4, 10, 6, 7, 88, 9, 10, 11,100])

let chart;

const refreshChartData = (songData_1, songData_2, songData_3) => {
    let date = new Date()
    let hour = date.getHours()
    let label = []
    for (let index = 0; index < 12; index += 1) {
        label.push(Time.Hour.plus(Time.Hour.plus(hour, -11), index) + ":00")
        // console.log(label.at(index))
    }
    // for (let index = 0; index < 6; index += 1) {
    //     label.push(Time.Hour.plus(hour, index) + ":00")
    //     // console.log(label.at(index+6))
    // }

    // ctx.scale = 1
    // ctx.canvas.parentNode.style.widht = ctx.canvas.width/2
    // ctx.canvas.parentNode.style.height = ctx.canvas.height/2

    data = {
        labels: label, // Các nhãn trên trục x
        datasets: [
            {
                label: song_1.songName,
                data: song_1.songData,
                borderColor: 'rgba(0, 123, 255, 1)', // Màu xanh dương
                backgroundColor: 'rgba(0, 123, 255, 0.2)', // Hiệu ứng bóng
                borderWidth: 2,
                pointBackgroundColor: 'white',
                pointBorderColor: 'rgba(0, 123, 255, 1)',
                pointRadius: 6, // Độ lớn các điểm
            },
            {
                label: song_2.songName,
                data: song_2.songData,
                borderColor: 'rgba(0, 255, 0, 0.8)', // Màu xanh lá
                // borderDash: [5, 5], // Gạch đứt
                borderWidth: 2,
                fill: false,
            },
            {
                label: song_3.songName,
                data: song_3.songData,
                borderColor: 'rgba(255, 0, 0, 0.8)', // Màu đỏ
                // borderDash: [5, 5], // Gạch đứt
                borderWidth: 2,
                fill: false,
            }
        ]
    };


    config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            aspectRatio: 1,
            maintainAspectRatio: false,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    ticks: { color: 'white' }, // Màu chữ trục x
                    // grid: { color: '#444' }, // Màu lưới
                },
                y: {
                    ticks: { color: 'transparent' }, // Màu chữ trục y
                    grid: {
                        color: '#444',
                        borderDash: [10, 20]
                    }, // Màu lưới
                }
            }
        }
    };

}




const showChart = () => {
    refreshChartData(song_1, song_2, song_3)
    chart = new Chart(ctx, config);
}

const getChart = () => {
    return chart;
}

const destroyChart = () => {
    chart.destroy();
}

