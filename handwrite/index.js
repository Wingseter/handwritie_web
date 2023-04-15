const express = require ("express");
const http = require("http");

const app = express();

const port = process.env.PORT;
const STORAGE_HOST = process.env.STORAGE_HOST;
const STORAGE_PORT = process.env.STORAGE_PORT;

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