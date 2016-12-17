import * as path from "path";
import * as child_process from "child_process";
import { DomConfig } from "./DomConfig";
export class DomServer {
    private dom4: string;
    private config: DomConfig;
    constructor(config: DomConfig, domPath: string) {
        this.config = config;
        this.dom4 = path.resolve(`${domPath}dom4.sh`);
    }

    private initialize() {
        let dominions = child_process.spawn(this.dom4,
            [
                this.config.title,
                "--port", this.config.port,
                "--era", this.config.era,
                "-T",
                "-S",
                "-o",
                "--mapfile", this.config.map,
                "--newgame"
            ]);

        dominions.stdout.on("data", (data: any) => {
            console.log(data.toString());
        });

        dominions.stderr.on("data", (data: any) => {
            console.log(data.toString());
        });

        dominions.on("exit", (code) => {
            if (code === 0) {
                // host();
            } else {
                console.log(`server exited with code ${code}`);
            }
        });
    }

    private launch() {
        let dominions = child_process.spawn(this.dom4,
            [
                this.config.title,
                "--port", this.config.port,
                "-T",
                "-S",
                "--noclientstart",
                "--era", this.config.era
            ]);

        dominions.stdout.on("data", (data: any) => {
            console.log(data.toString());
        });

        dominions.stderr.on("data", (data: any) => {
            console.log(data.toString());
        });

        dominions.on("exit", (code) => {
            if (code === 0) {
                this.initialize();
            } else {
                console.log(`server exited with code ${code}`);
            }
        });

    }

    public version(): void {
        let dominions = child_process.spawn(this.dom4, ["--version"]);
        dominions.stdout.on("data", (data) => {
            console.log(data.toString());
        });
    }

    public start() {
        this.launch();
    }
}