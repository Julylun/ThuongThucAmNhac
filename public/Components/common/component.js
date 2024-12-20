export {
    createElement
}

/**
 * 
 * example:
 * //HTML
 * <bodyi>
 *        <div id="id-content" class="class-content hidden"><p>hello world</p></div>
 * </body>
 * 
 * //Js
 * let body = document.body
 * createElement('div',['class-content','hidden'],body,{innerHTML:"<p>Hello world</p>", 'id-content'})
 * 
 * 
 * @param {string} tag 
 * @param {string[]} classNameS 
 * @param {HTMLElement} parent 
 * @param {Object} attributes 
 * @param {string} id 
 * @returns 
 */
const createElement = (tag, classNameS, parent, attributes = {}, id) => {
    let element = document.createElement(tag);
    // if (className) element.className = className;
    if(!classNameS.length == 0)
    for(let className of classNameS) {
        element.classList.add(className);
    }
    for (let key in attributes) {
        element[key] = attributes[key];
    }
    // console.log(id)
    if (id) element.id = id;
    if (parent) parent.appendChild(element);
    
    return element;
}