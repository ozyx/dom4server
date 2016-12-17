import * as path from "path";
import * as child_process from "child_process";
import { DomConfig } from "./DomConfig";
export class DomServer {
    private dom4: string;

    constructor(domPath: string) {
        this.dom4 = path.resolve(`${domPath}dom4.sh`);
    }

    private launch(config: DomConfig) {
        let dominions = child_process.spawn(`${this.dom4}`,
            [
                config.title,
                "--port", `${config.port}`,
                "-T",
                "-S",
                "--noclientstart",
                "--era", `${config.era}`
            ]);

        dominions.stdout.on("data", (data: any) => {
            console.log(data.toString());
        });

        dominions.stderr.on("data", (data: any) => {
            console.log(data.toString());
        });

        dominions.on("exit", (code) => {
            console.log(`exited with code ${code}`);
        });

    }

    public version(): void {
        let dominions = child_process.spawn(`${this.dom4}`, ["--version"]);
        dominions.stdout.on("data", (data) => {
            console.log(data.toString());
        });
    }

    public start(config: DomConfig) {
        this.launch(config);
    }
}