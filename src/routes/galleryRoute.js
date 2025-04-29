const express = require("express");
const router = express.Router();
const galleryController = require("../controllers/galleryController");
const upload = require("../config/upload");
const apiKeyMiddleware = require("../config/apiKey");

router.use(apiKeyMiddleware);
router.get("/galleries", galleryController.getAllGalleries);
router.get("/galleries/:id", galleryController.getGalleryById);
router.post("/galleries", upload.single("photo"), galleryController.createGallery);
router.put("/galleries/:id", galleryController.updateGallery);
router.delete("/galleries/:id", galleryController.deleteGallery);

module.exports = router;