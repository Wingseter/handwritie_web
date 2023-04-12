const express = require ("express");
const fs = require("fs");

const app = express();
const port = 3001;

app.get("/video", (req, res) => {
    const path = "./resource/pexels-cottonbro-studio-5659545-4096x2160-50fps.mp4";

    fs.stat(path, (err, stats) => {
        if (err) {
            console.error("An error occurred ");
            res.sendStatus(500);
            return;
        }

        res.writeHead(200, {
            "Content-Length": stats.size,
            "Content-Type": "video/mp4",
        });
        fs.createReadStream(path).pipe(res);
    });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});