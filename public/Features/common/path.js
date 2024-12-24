export {
    getFileAbsolutePath,
    getRelativePath,
    getFileName,
    removeFileName
}


const getFileName = (path) => {
    return path.match(/(.+\/)[^/]+$/)[1]
}

const removeFileName = (path) => {
    return path.replace(/^https?:\/\/[^\/]+/, '');

}

function getRelativePath(from, to) {
    const fromParts = from.split('/').filter(Boolean);
    const toParts = to.split('/').filter(Boolean);

    let i = 0;
    while (i < fromParts.length && i < toParts.length && fromParts[i] === toParts[i]) {
        i++;
    }

    const upSteps = fromParts.length - i - 1;
    const downSteps = toParts.slice(i);

    const relativePath = [
        ...Array(upSteps).fill('..'),
        ...downSteps
    ].join('/');

    return relativePath || './';
}

const getFileAbsolutePath = (filePath) => {
    return new URL(filePath, window.location.href).href;
}