export {
    ChartManager
}

const scale = window.devicePixelRatio || 1;
class ChartManager {
    #ctx = null
    #columnName = null
    #rowName = null
    #columnMarkerList = null
    #rowMarkerList = null


    constructor(canvasHtmlElement) {
        this.ctx = canvasHtmlElement.getContext('2d')
    }

    drawRow() {
        let rowMarkerSize = this.rowMarkerList.length
        let spaceBetweenMarker = Math.round((this.ctx.canvas.height*2/3) / (rowMarkerSize-1)) 


        console.log('rowMakerSize: %d', rowMarkerSize)
        console.log('spaceBetweenMarker: %d', spaceBetweenMarker)
        this.ctx.setLineDash([3, 5])
        this.ctx.lineWidth = 0.5
        this.ctx.strokeStyle = 'white'
        for (let index = 0; index <= rowMarkerSize; index += 1) {
            this.ctx.font = ""
            this.ctx.moveTo(0, spaceBetweenMarker * index + 5)
            this.ctx.lineTo(this.ctx.canvas.width - 1, spaceBetweenMarker * index)
        }
        this.ctx.stroke()
        
    }

    scale() {
        console.log('[FlowDebug](Chart.js - scale): Canvas size (w,h)(px) ->' + this.ctx.canvas.clientWidth + " : " + this.ctx.canvas.clientHeight)
        console.log('[FlowDebug](Chart.js - scale): Chart is started, Device scale -> ' + scale)
        this.ctx.canvas.width = this.ctx.canvas.clientWidth * scale
        this.ctx.canvas.height = this.ctx.canvas.clientHeight * scale
        this.ctx.scale(scale, scale)

    }

    drawChart() {
        this.scale()
        this.drawRow()
    }


    // Getter setter
    setColumnName(columnName) {
        this.columnName = columnName
    }
    getColumnName() {
        return this.rowName
    }
    setRowName(rowName) {
        this.rowName = rowName
    }
    getRowName() {
        return this.rowName
    }
    setColumnMarkerList(columnMarkerList) {
        this.columnMarkerList = columnMarkerList
    }
    getColumnMarkerList() {
        return this.columnMarkerList
    }
    setRowMarkerList(rowMarkerList) {
        this.rowMarkerList = rowMarkerList
    }
    getRowMarkerList() {
        return this.rowMarkerList
    }

}