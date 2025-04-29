require("dotenv").config();  
const express = require("express");  
const cors = require("cors");  
const galleryRoute = require("./src/routes/galleryRoute");
const artistRoute = require("./src/routes/artistRoute");
const reportRoute = require("./src/routes/reportRoute");

const app = express();  
app.use(cors()); 
app.use(express.json());

app.use("/api", galleryRoute);
app.use("/api", artistRoute);
app.use("/api", reportRoute);

const PORT = process.env.PORT || 4000;  

app.listen(PORT, () => {  
    console.log(`Servidor rodando 🖼️  http://localhost:${PORT}`);  
});