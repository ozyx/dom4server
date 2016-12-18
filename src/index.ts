import { DomServer } from "./DomServer";
import { DomConfig } from "./DomConfig";
import * as fs from "fs";
import * as http from "http";
import * as path from "path";
import * as express from "express";
let app = express();

const home = "src/index.html";
let dominions4: DomServer;

app.use(express.static("public"));
app.get("/index.html", (req, res) => {
    res.sendFile(path.resolve(home));
});

app.get("/process_get", (req, res) => {
    // Prepare output in JSON format
    let response: DomConfig = req.query;

    dominions4 = new DomServer(response, "./");
    dominions4.version((version) => {
        console.log(version);
        dominions4.start();
        if (dominions4.isRunning()) {
            res.end("dom4 is running");
        } else {
            res.end("dom4 not running");
        }
    });
});

let server = app.listen(8081, () => {

    let host = server.address().address;
    let port = server.address().port;

    console.log(`Server listening at http://${host}:${port}`);

});
