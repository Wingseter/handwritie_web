const express = require ("express");
const http = require("http");
const mongodb = require("mongodb");

const app = express();

const port = process.env.PORT;
const STORAGE_HOST = process.env.STORAGE_HOST;
const STORAGE_PORT = process.env.STORAGE_PORT;
const DBHOST = process.env.DBHOST;
const DBNAME = process.env.DBNAME;

function main() {
    return mongodb.MongoClient.connect(DBHOST)
        .then(client => {
            const db = client.db(DBNAME);
            const videoCollection = db.collection("videos");
        
            app.get("/video", (req, res) => {
                const videoId = 
                    new mongodb.ObjectID(req.query.id);
                videosCollection
                    .findOne({ _id: videoId })
                    .then(videoRecord  => {
                        if (!videoRecord) {
                            res.sendStatus(404);
                            return;
                        }

                        const forwardRequest = http.request({
                            host: STORAGE_HOST,
                            port: STORAGE_PORT,
                            path: `/video?path=${videoRecord.videoPath}`,
                            method: 'GET',
                            headers: req.headers
                        },
                        forwardResponse => {
                            res.writeHeader(forwardResponse.statusCode, forwardResponse.headers);
                            forwardResponse.pipe(res);
                        });

                    req.pipe(forwardRequest);
                })
                .catch(err => {
                    console.error(err && err.stack || err);
                    res.sendStatus(500);
                });
        });
        app.listen(PORT, () => {
            console.log(`Microservice Online`);
        });
    });
}

app.get("/video", (req, res) => {
    const forwardRequest = http.request({
        host: STORAGE_HOST,
        port: STORAGE_PORT,
        path: '/video?path=pexels-cottonbro-studio-5659545-4096x2160-50fps.mp4',
        method: 'GET',
        headers: req.headers
    }, forwardResponse => {
        res.writeHead(forwardResponse.statusCode, forwardResponse.headers);
        forwardResponse.pipe(res);
    });
    req.pipe(forwardRequest);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});