const express = require("express");
const router = express.Router();
const reportController = require("./../controllers/reportController");
const apiKeyMiddleware = require("../config/apiKey");

router.use(apiKeyMiddleware);
router.get("/report/artists/pdf", reportController.exportArtistPDF);
router.get("/report/galleries/pdf", reportController.exportGalleryPDF);

module.exports = router;