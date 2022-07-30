const deleteImageHelper = (prevArray, imagesToDelete) => {
    return prevArray.filter((file) => (!(imagesToDelete.includes(file.filePath))));
}

export default deleteImageHelper;