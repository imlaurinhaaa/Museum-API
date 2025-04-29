const pool = require("../config/database.js");

const getArtists = async () => {
    const result = await pool.query("SELECT * FROM artists");
    return result.rows;
};

const getArtistById = async (id) => {
    const result = await pool.query("SELECT * FROM artists WHERE id = $1", [id]);
    return result.rows[0];
};

const createArtist = async (name, age, style, death)  =>  {
    const result = await pool.query(
        "INSERT INTO artists (name, age, style, death) VALUES ($1, $2, $3, $4) RETURNING *",
        [name, age, style, death]
    );
    return result.rows[0];
};

const updateArtist = async (id, name, age, death) => {
    const result = await pool.query(
        "UPDATE artists SET name = $1, age = $2, death = $3 WHERE id = $4 RETURNING *",
        [name, age, death, id]
    );
    return result.rows[0];
};

const deleteArtist = async (id) => {
    const result = await pool.query("DELETE FROM artists WHERE id = $1 RETURNING *", [id]);
    if (result.rowCount === 0) { 
        return { error: "Artista não encontrado." };
    }
    return result.rows[0];
};

module.exports = { getArtists, getArtistById, createArtist, updateArtist, deleteArtist };