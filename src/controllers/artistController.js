const artistModel = require('../models/artistModel');

const getAllArtists = async (req, res) => {
    try {
        const artists = await artistModel.getArtists();
        res.status(200).json(artists);
    } catch (error) {
        res.status(404).json({ error: "Erro ao buscar artistas." });
    }
};

const getArtistById = async (req, res) => {
    try {
        const artist = await artistModel.getArtistById(req.params.id);
        if (!artist) {
            return res.status(404).json({ error: "Artista não encontrado." });
        }
        res.status(200).json(artist);
    } catch (error) {
        res.status(404).json({ error: "Erro ao buscar artista." });
    }
};

const createArtist = async (req, res) => {
    try {
        const { name, age, style, death } = req.body;
        const newArtist = await artistModel.createArtist(name, age, style, death);
        res.status(201).json(newArtist);
    } catch (error) {
        if (error.code === '23505') {
            return res.status(409).json({ error: "Artista já existe." });
        }
        res.status(404).json({ error: "Erro ao criar artista." });
    }
};

const updateArtist = async (req, res) => {
    try {
        const { name, age, death } = req.body;
        const updatedArtist = await artistModel.updateArtist(req.params.id, name, age, death); 
        if (!updatedArtist) { 
            return res.status(404).json({ message: "Usuário não encontrado." }); 
        }
        res.json(updatedArtist); 
    } catch (error) {
        res.status(404).json({ message: "Erro ao atualizar artista." }); 
    }
};

const deleteArtist = async (req, res) => {
    try {
        const deletedArtist = await artistModel.deleteArtist(req.params.id);
        res.status(200).json(deletedArtist);
    } catch (error) {
        res.status(404).json({ error: "Erro ao deletar artista." });
    }
};

module.exports = { getAllArtists, getArtistById, createArtist, updateArtist, deleteArtist };