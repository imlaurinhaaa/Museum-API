const galleryModel = require('../models/galleryModel');

const getAllGalleries = async (req, res) => {
    try {
        const { name } = req.query;
        const galleries = await galleryModel.getGalleries(name);
        res.status(200).json(galleries);
    } catch (error) {
        res.status(404).json({ error: "Erro ao buscar obras." });
    }
};

const getGalleryById = async (req, res) => {
    try {
        const gallery = await galleryModel.getGalleryById(req.params.id);
        if (!gallery) {
            return res.status(404).json({ error: "Obra não encontrada." });
        }
        res.status(200).json(gallery);
    } catch (error) {
        res.status(404).json({ error: "Erro ao buscar obra." });
    }
};

const createGallery = async (req, res) => {
    try {
        const { artist_id, name, localization } = req.body;
        const photo = req.file ? req.file.filename : null;
        const newGallery = await galleryModel.createGallery(artist_id, name, photo, localization); 
        res.status(201).json(newGallery);
    } catch (error) {
        if (error.code === '23505') {
            return res.status(409).json({ error: "Obra já existe." });
        }
        res.status(500).json({ error: "Erro ao criar obra." });
    }
};

const updateGallery = async (req, res) => {
    try {
        const { name, localization } = req.body;
        const updatedGallery = await galleryModel.updateGallery(req.params.id, name, localization);
        if (!updatedGallery) {
            return res.status(404).json({ error: "Obra não encontrada." });
        }
        res.status(200).json(updatedGallery);
    } catch (error) {
        res.status(404).json({ error: "Erro ao atualizar obra." });
    }
};

const deleteGallery = async (req, res) => {
    try {
        const deletedGallery = await galleryModel.deleteGallery(req.params.id);
        res.status(200).json(deletedGallery);
    } catch (error) {
        res.status(404).json({ error: "Erro ao deletar obra." });
    }
};

module.exports = { getAllGalleries, getGalleryById, createGallery, updateGallery, deleteGallery };