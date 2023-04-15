const express = require("express");
const azure = require("azure-storage");

const app = express();

const port = process.env.PORT;
const STORAGE_ACCOUNT_NAME = process.env.STORAGE_ACCOUNT_NAME;
const STORAGE_ACCESS_KEY = process.env.STORAGE_ACCESS_KEY;

function createBlobService(){
    const blobService = azure.createBlobService(
        STORAGE_ACCOUNT_NAME,
        STORAGE_ACCESS_KEY);
    return blobService;
}

app.get("/video", (req, res) => {

    const videoPath = req.query.path;
    const blobService = createBlobService();

    const containerName = "videos";
    blobService.getBlobProperties(containerName, videoPath, (err, properties) => {
        if (err) {
            console.error("An error occurred ");
            res.sendStatus(500);
            return;
        }

        res.writeHead(200, {
            "Content-Type": "video/mp4",
            "Content-Length": properties.contentLength,
        });
        
        blobService.getBlobToStream(containerName, videoPath, res, err => {
            if (err) {
                console.error(err && err.stack || err);
                res.sendStatus(500);
                return;
            }
        });
    });
});

app.listen(port, () => {
    console.log(`Microservice Online`);
});
