const deleteImageHelper = (prevArray, imagesToDelete, imagesToAdd) => {
    let imageArray = prevArray.filter((file) => (!(imagesToDelete.includes(file.filePath))));
    if (imagesToAdd != null) {
        imagesToAdd.forEach((image) => { 
            imageArray.push(image);
        })
    }
    return imageArray;
}

export default deleteImageHelper;