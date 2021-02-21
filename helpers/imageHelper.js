/**
 * Converti le path temporaire d'une image en path défénitif
 * @param path_image "Path temporaire pointant sur le dossier image/temp"
 * @returns {string} "Path défénitive pointant sur le dossier image"
 */
function convertPathTempToImage( path_image ) {
    return path_image.replace('/temp', '');
}

module.exports = { convertPathTempToImage };
