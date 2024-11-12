export {
    getTextFromFile
}

const getTextFromFile = async (filePath) => {
    let data = await fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error("Can't get text from file - The file doesn't exist or the network is bad!")
            }
            return response.text()
        })
    return data
}

