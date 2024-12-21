import * as Chart from "./leelunchart.utils.js"

const onStart = () => {
    Chart.showChart()
    window.addEventListener('resize', () => {
        Chart.destroy()
        Chart.showChart()
    })
}


onStart()