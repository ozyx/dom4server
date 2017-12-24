import * as path from "path";
import * as child_process from "child_process";
import { DomConfig } from "./DomConfig";
export class DomServer {
    private dom4: string;
    private config: DomConfig;
    private dominions: any;

    constructor(config: DomConfig, domPath: string) {
        this.config = config;
        this.dom4 = path.resolve(`${domPath}dom4.sh`);
    }

    private initialize() {
        this.dominions = child_process.spawn(this.dom4,
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

        this.dominions.stdout.on("data", (data: any) => {
            console.log(data.toString());
        });

        this.dominions.stderr.on("data", (data: any) => {
            console.log(data.toString());
        });

        this.dominions.on("exit", (code: number) => {
            if (code === 0) {
                // host();
            } else {
                console.log(`server exited with code ${code}`);
            }
        });
    }

    private launch() {
        this.dominions = child_process.spawn(this.dom4,
            [
                this.config.title,
                "--port", this.config.port,
                "-T",
                "-S",
                "--noclientstart",
                "--era", this.config.era
            ]);

        this.dominions.stdout.on("data", (data: any) => {
            console.log(data.toString());
        });

        this.dominions.stderr.on("data", (data: any) => {
            console.log(data.toString());
        });

        this.dominions.on("exit", (code: any) => {
            if (code === 0) {
                this.initialize();
            } else {
                console.log(`server exited with code ${code}`);
            }
        });

    }

    public version(callback: (version: string) => void): void {
        this.dominions = child_process.spawn(this.dom4, ["--version"]);
        this.dominions.stdout.on("data", (data: any) => {
            callback(data.toString());
        });
    }

    public start(): void {
        this.launch();
    }

    public isRunning(): boolean {
        return this.dominions.pid !== undefined;
    }
}
