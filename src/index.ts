import { DomServer } from "./DomServer";
import { DomConfig } from "./DomConfig";

let config: DomConfig = require("../config.json");
let domServer: DomServer = new DomServer(config, "./");

domServer.version();
domServer.start();