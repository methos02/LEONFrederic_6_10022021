/**
 * Converti le path temporaire d'une image en path défénitif
 * @param path_image "Path temporaire pointant sur le dossier image/temp"
 * @returns {string} "Path défénitive pointant sur le dossier image"
 */
function getRelativePath( path_image ) {
    return path_image.split('localhost:3000/')[1];
}

module.exports = { getRelativePath };
