import * as path from "path";
import * as child_process from "child_process";

export class DomServer {
    private dom4: string;

    constructor(domPath: string) {
        let version: string = "dom4_x86";
        this.dom4 = path.resolve(`${domPath}${version}`);
    }

    public help(): void {
        let dominions = child_process.spawn(`${this.dom4}`, ["--version"]);
        dominions.stdout.on("data", (data) => {
            console.log(data.toString());
        });
    }
}