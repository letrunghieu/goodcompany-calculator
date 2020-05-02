import {info} from "./libs/output";

const latestVersionDirectoryUrl = "https://goodcompanygame.com/gamedata/";

class Program {
    constructor(private versionDirectory: string) {
    }

    public async run(): Promise<void> {
        await this.downloadMaterial();
    }

    private async downloadMaterial(): Promise<void> {
        console.log(info("Downloading the material data ..."));
    }
}

const program = new Program(latestVersionDirectoryUrl);

program.run();