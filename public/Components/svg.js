export {
    changeColor,
    changeElementsColor
}


/**changeColor dung de thay doi mau sac stroke cua mot phan tu svg
 * @param svgElement The HtmlElement cua doi tuong svg
 * A@param color mau sac thay doi
 */
const changeColor = (svgElement, color) => {
    for (let path of svgElement.getElementsByTagName('path')) {
        path.setAttribute('stroke',color)
    }
}

const changeElementsColor = (elementClassName, color) => {
    for (let svgElement of document.getElementsByClassName(elementClassName)) {
        changeColor(svgElement,color)
    }
}
