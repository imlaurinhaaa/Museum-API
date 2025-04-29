const pool = require("../config/database.js");

const getGalleries = async (name) => {
    if (!name) {
        const result = await pool.query(`SELECT galleries.*, artists.name AS artista 
            FROM galleries 
            JOIN artists ON galleries.artist_id = artists.id`);
        return result.rows;
    } else {
        const result = await pool.query(
            `SELECT galleries.*, artists.name AS artista
                FROM galleries
                LEFT JOIN artists ON galleries.artist_id = artists.id
                WHERE galleries.name ILIKE $1`, [`%${name}%`]
        );
        return result.rows;
    }
};

const getGalleryById = async (id) => {
    const result = await pool.query("SELECT * FROM galleries WHERE id = $1", [id]);
    return result.rows[0];
};

const createGallery = async (artist_id, name, photo, localization) =>  {
    const result = await pool.query(
        "INSERT INTO galleries (artist_id, name, photo, localization) VALUES ($1, $2, $3, $4) RETURNING *",
        [artist_id, name, photo, localization]
    );
    return result.rows[0];
};

const updateGallery = async (id, name, localization) => {
    const result = await pool.query(
        "UPDATE galleries SET name = $1, localization = $2 WHERE id = $3 RETURNING *",
        [name, localization, id]
    );
    return result.rows[0];
};

const deleteGallery = async (id) => {
    const result = await pool.query("DELETE FROM galleries WHERE id = $1 RETURNING *", [id]);
    if (result.rowCount === 0) { 
        return { error: "Obra não encontrado." };
    }
    return result.rows[0];
};

module.exports = { getGalleries, getGalleryById, createGallery, updateGallery, deleteGallery };