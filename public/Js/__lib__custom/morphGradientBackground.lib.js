function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
const fixedSize = 200;
const fixedFilter = 70;

const valueToTarget = (value, targetValue, increaseValue) => {
    if (value < targetValue) {
        if (targetValue - value < increaseValue) return targetValue;
        return value += increaseValue;
    }
    else {
        if (value - targetValue < increaseValue) return targetValue;
        return value -= increaseValue;
    }
}

//Move element from this pos to anothor pos with ease linear animation
const goGoBurhBurh = (element, targetPosition, time) => {
    const movingDistancePerTime = 50;
    //Distance between element and target pos
    let distance = Math.sqrt(
        Math.abs(Math.pow(targetPosition.x - element.offsetLeft, 2) - Math.pow(targetPosition.y - element.offsetTop, 2))
    )
    console.log('time to move inside function: ' + time)
    console.log('distance between two point: ' + distance)
    //Space per milis = distance / time (fixed)
    let spacePerMilis = Math.floor(distance / (time / 1000)); //int
    console.log('space per milis:')
    console.log('Details: ' + targetPosition.x + " " + targetPosition.y + ' ' + element.offsetLeft + ' ' + element.offsetTop)

    let intervalId = setInterval(() => {
        let elementYPos = element.offsetTop;
        let elementXPos = element.offsetLeft;

        // console.log(elementXPos)
        // console.log(valueToTarget(elementXPos, targetPosition.x,spacePerMilis) + "px")
        if (elementXPos != targetPosition.x) element.style.left = valueToTarget(elementXPos, targetPosition.x, spacePerMilis) + 'px';
        if (elementYPos != targetPosition.y) element.style.top = valueToTarget(elementYPos, targetPosition.y, spacePerMilis) + 'px';
    })
}
const makeItGoingMorph = (spotLight, movingDistance) => {
    let dynamicSizeHeight = random(fixedSize - 20, fixedSize + 20);
    let dynamicSizeWidth = random(fixedSize - 20, fixedSize + 20);
    let dynamicFilterRange = random(fixedFilter - 20, fixedFilter + 30);
    let randomPos = {
        x: random(spotLight.offsetLeft - movingDistance, spotLight.offsetLeft + movingDistance),
        y: random(spotLight.offsetTop - movingDistance, spotLight.offsetTop + movingDistance)
    }

    //Time to move have to smaller than interval delay tme
    let timeToMove = random(1, 3) * 1000;
    console.log('time to move' + timeToMove)

    spotLight.style.width = dynamicSizeWidth + 'px';
    spotLight.style.height = dynamicSizeHeight + 'px';
    spotLight.style.filter = 'blur(' + dynamicFilterRange + 'px)';
    goGoBurhBurh(spotLight, randomPos, timeToMove);
}

const createSpotLight = (colorCode, randomPos, isFollowMouse) => {
    let spotLight = document.createElement('div');
    if (isFollowMouse) {
        spotLight.classList.add('stalker-light')
    }
    else spotLight.classList.add('spot-light');
    spotLight.style.backgroundColor = colorCode;
    spotLight.style.filter = 'blur(100px)';
    document.getElementsByClassName('morph-gradient-background').item(0).appendChild(spotLight)
    if (randomPos) {
        spotLight.style.top = random(0, spotLight.parentElement.offsetHeight) + 'px';
        spotLight.style.left = random(0, spotLight.parentElement.offsetWidth) + 'px';
    }

}
const onMorphStart = () => {
    createSpotLight('#2F93F7', true);
    createSpotLight('#C851B2', true);
    createSpotLight('#C851B2', true, true);
    setInterval(() => {
        let spotLights = document.getElementsByClassName('spot-light');
        for (let spItem of spotLights) {
            makeItGoingMorph(spItem, 200)
        }

        let mouseInterval = undefined;
        let lastEvent;
        document.addEventListener('mousemove', (e) => {
            lastEvent = e;
            if (mouseInterval == undefined) mouseInterval = setInterval(() => {
                let stalkerLights = document.getElementsByClassName('stalker-light')
                for (let stalkerLight of stalkerLights) {

                    let dynamicSizeHeight = random(fixedSize - 20, fixedSize + 20);
                    let dynamicSizeWidth = random(fixedSize - 20, fixedSize + 20);
                    let dynamicFilterRange = random(fixedFilter - 20, fixedFilter + 30);

                    stalkerLight.style.width = dynamicSizeWidth + 'px';
                    stalkerLight.style.height = dynamicSizeHeight + 'px';
                    stalkerLight.style.filter = 'blur(' + dynamicFilterRange + 'px)';
                    stalkerLight.style.top = (lastEvent.clientY - stalkerLight.offsetHeight / 2) + 'px';
                    stalkerLight.style.left = (lastEvent.clientX - stalkerLight.offsetWidth / 2) + 'px';
                }
            }, 1000)
        })
        // console.log(spotLights)
    }, 3000)
}

const createMorphRoot = () => {
    let root = document.createElement('div');
    let style = document.createElement('style');
    style.innerHTML = ".spot-light,.stalker-light{position:fixed;z-index:-100;top:0;left:0;border-radius:100%}.stalker-light{transition:4s ease-out}.spot-light{transition:3s ease-in-out}"
    root.appendChild(style);
    root.classList.add('morph-gradient-background');
    root.classList.add('w-full');
    root.classList.add('h-full');
    root.classList.add('fixed');
    root.classList.add('z-[1]]');



    let parent = document.getElementById('js__content');
    parent.insertBefore(root,parent.firstChild)
}

const onStart = () => {
    createMorphRoot();

}


onStart();