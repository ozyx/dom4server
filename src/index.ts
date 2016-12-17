import { DomServer } from "./DomServer";
import { DomConfig } from "./DomConfig";
import * as fs from "fs";
import * as http from "http";
import * as path from "path";

let dispatch = require("dispatch");
// let config: DomConfig = require("../config.json");
// let domServer: DomServer = new DomServer(config, "./");

// domServer.version();
// domServer.start();

const port = 4200;

let server = http.createServer(dispatch({
    "/": {
        GET: (req: any, res: any) => {
            fs.readFile("./src/index.html", (err: any, data: any) => {
                if (err) {
                    console.error(err.message);
                } else {
                    res.writeHead(200, {
                        "Content-Type": "text/html",
                        "Content-Length": data.length
                    });
                    res.write(data);
                    res.end();
                }
            });
        }
    },
    "/launch": {
        GET: (req: any, res: any) => {
            console.log("launch");
            res.end();
        }
    }
}));

// start server
server.listen(port, () => {
    console.log(`Server listening on: http://localhost:${port}`);
});