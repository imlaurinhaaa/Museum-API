const PDFDocument = require("pdfkit");

const artistModel = require("../models/artistModel");
const galleryModel = require("../models/galleryModel");

const exportArtistPDF = async (req, res) => {
    try {
        const artists = await artistModel.getArtists();

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "inline; filename=artists.pdf");

        const doc = new PDFDocument();
        doc.pipe(res);

        // Título
        doc.fontSize(20).text("Relatório de Artistas", { align: "center" });
        doc.moveDown(); 

        // Cabeçalho da Tabela
        const tableTop = 130; 
        const rowHeight = 30; 
        const columnWidths = [70, 200, 120, 120, 120]; 
        let y = tableTop;
        
        doc.fontSize(12).font("Helvetica-Bold");
        doc.text("Id", 50, y, { width: columnWidths[0], align: "left" });
        doc.text("Name", 120, y, { width: columnWidths[1], align: "left" });
        doc.text("Age", 260, y, { width: columnWidths[2], align: "left" });
        doc.text("Style", 340, y, { width: columnWidths[3], align: "left" });
        doc.text("Death", 500, y, { width: columnWidths[4], align: "left" });
        doc.moveTo(50, y + rowHeight - 5).lineTo(560, y + rowHeight - 5).stroke(); 
        
        // Dados da Tabela
        doc.font("Helvetica");
        y += rowHeight;
        artists.forEach((artist) => {
            doc.text(artist.id, 50, y, { width: columnWidths[0], align: "left" });
            doc.text(artist.name, 120, y, { width: columnWidths[1], align: "left" });
            doc.text(artist.age, 260, y, { width: columnWidths[2], align: "left" });
            doc.text(artist.style, 340, y, { width: columnWidths[3], align: "left" });
            doc.text(artist.death, 500, y, { width: columnWidths[4], align: "left" });
            y += rowHeight;
        
            doc.moveTo(50, y - 5).lineTo(560, y - 5).stroke();
        });

        doc.end();
    } catch (error) {
        res.status(500).json({ message: "Erro ao gerar o PDF" });
    }
};

const exportGalleryPDF = async (req, res) => {
    try {
        const galleries = await galleryModel.getGalleries();

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "inline; filename=galleries.pdf");

        const doc = new PDFDocument();
        doc.pipe(res);

        // Título
        doc.fontSize(20).text("Relatório de Galerias", { align: "center" });
        doc.moveDown(); 

        // Cabeçalho da Tabela
        const tableTop = 130; 
        const rowHeight = 60; 
        const columnWidths = [70, 200, 120, 120, 120]; 
        let y = tableTop;
        
        doc.fontSize(12).font("Helvetica-Bold");
        doc.text("Id", 50, y, { width: columnWidths[0], align: "left" });
        doc.text("Artist", 90, y, { width: columnWidths[1], align: "left" });
        doc.text("Name", 150, y, { width: columnWidths[2], align: "left" });
        doc.text("Photo", 280, y, { width: columnWidths[3], align: "left" });
        doc.text("Localization", 420, y, { width: columnWidths[4], align: "left" });
        doc.moveTo(50, y + rowHeight - 5).lineTo(560, y + rowHeight - 5).stroke(); 
        
        // Dados da Tabela
        doc.font("Helvetica");
        y += rowHeight;
        galleries.forEach((gallery) => {
            doc.text(gallery.id, 50, y, { width: columnWidths[0], align: "left" });
            doc.text(gallery.artist_id, 90, y, { width: columnWidths[1], align: "left" });
            doc.text(gallery.name, 150, y, { width: columnWidths[2], align: "left" });
            doc.text(gallery.photo, 280, y, { width: columnWidths[3], align: "left" });
            doc.text(gallery.localization, 420, y, { width: columnWidths[4], align: "left" });
            y += rowHeight;
        
            doc.moveTo(50, y - 5).lineTo(560, y - 5).stroke();
        });

        doc.end();
    } catch (error) {
        res.status(500).json({ message: "Erro ao gerar o PDF" });
    }
};


module.exports = { exportArtistPDF, exportGalleryPDF };