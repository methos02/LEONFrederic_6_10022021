function getPathImage( path_image ) {
    const explode_path = path_image.split('images/')
    return 'images/' + explode_path[explode_path.length - 1];
}

module.exports = { getPathImage };
