const imageHelper = (fileArray, prevFileArray) => { 
    const fileLength = fileArray.length;
    if (fileLength > 1) {
        return [...prevFileArray, ...fileArray];
    } else if (fileLength === 1) {
        return [...prevFileArray, fileArray[0]];
    }
    return [...prevFileArray];
}

export default imageHelper;