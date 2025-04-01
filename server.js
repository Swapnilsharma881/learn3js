import express from 'express';
import cors from 'cors';  // Import cors
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = 3000;

// Configure CORS with allowed origins
const corsOptions = {
  origin: 'http://localhost:5173',  // Allow only your frontend domain
};

app.use(cors(corsOptions));

// Define paths for textures and cubeMap folder
const texturesPath = path.join(process.cwd(), 'public', 'textures');
const cubeMapPath = path.join(process.cwd(), 'public', 'textures', 'cubeMap');

// Serve textures statically from both folders
app.use('/textures', express.static(texturesPath));  // This will serve files from 'textures' and 'cubeMap'

// API to get a list of texture files (including files from the 'cubeMap' folder)
app.get('/textures-list', (req, res) => {
    try {
        // Get the list of files from both folders
        const textureFiles = fs.readdirSync(texturesPath);
        const cubeMapFiles = fs.readdirSync(cubeMapPath);
        
        // Create objects with file names (without extensions) as keys and paths as values
        const textureFilesObject = textureFiles.reduce((acc, file) => {
            const key = file.split('.')[0]; // Get the file name without extension
            const path = `/textures/${file}`;
            acc[key] = path;
            return acc;
        }, {});

        const cubeMapFilesObject = cubeMapFiles.reduce((acc, file) => {
            const key = file.split('.')[0]; // Get the file name without extension
            const path = `/textures/cubeMap/${file}`;
            acc[key] = path;
            return acc;
        }, {});

        // Combine both objects into one
        const allFiles = { ...textureFilesObject, ...cubeMapFilesObject };

        // Send the response with the combined object
        res.json(allFiles);
    } catch (error) {
        console.error("Error reading textures:", error);
        res.status(500).json({ error: "Failed to load textures" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
