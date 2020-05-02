import {join} from 'path';
import {writeFileSync, mkdirSync, existsSync, writeFile, createWriteStream} from 'fs';
import fetch from 'node-fetch';
import download from 'download';
import {info} from "./libs/output";
import DataBuilder from "./libs/builders/DataBuilder";
import {IMaterials} from "./libs/models/responses/IMaterials";

const dataSourceDomain = "https://goodcompanygame.com";
const outputFolder = join(__dirname, 'output');
const supportedLocales = ['en', 'de', 'fr', 'es', 'pt', 'ru', 'ja', 'zh'];

class Program {
    private dataBuilder: DataBuilder;
    private sourceUrlPrefix: string;
    private localeUrlPrefix: string;

    constructor(
        private dataSourceDomain: string,
        private outputDirectory: string,
        private supportedLocales: string[],
    ) {
        this.sourceUrlPrefix = `${dataSourceDomain}/gamedata`;
        this.localeUrlPrefix = `${dataSourceDomain}/localization`;
        this.dataBuilder = new DataBuilder();
    }

    public async run(): Promise<void> {
        this.ensureOutputFolderExist();
        await this.downloadMaterial();
        await this.downloadLocaleFiles();
        this.writeData();
    }

    private ensureOutputFolderExist(): void {
        this.ensureFolderExist(this.outputDirectory);
    }

    private async downloadMaterial(): Promise<void> {
        console.log(info("Downloading the material data ..."));

        const materialUrl = `${this.sourceUrlPrefix}/materials.json`;

        const jsonContent = await fetch(materialUrl).then(response => response.json());

        this.dataBuilder.addMaterialFromSource(jsonContent as IMaterials);
    }

    private writeData(): void {
        console.log(info("Writing data ..."));
        const dataFilePath = join(this.outputDirectory, 'data.json');
        writeFileSync(dataFilePath, JSON.stringify(this.dataBuilder.getData(), null, 2));
        console.log(` - [${dataFilePath}]`);
    }

    private async downloadLocaleFiles(): Promise<void> {
        console.log(info("Writing locale files ..."));

        const localeOutputDirectory = join(this.outputDirectory, 'locales');
        this.ensureFolderExist(localeOutputDirectory);

        const localeFiles = await Promise.all(this.supportedLocales.map(locale => {
            const localeUrl = `${this.localeUrlPrefix}/goodcompanyBase_${locale}.json`;
            const localeOutputFile = join(localeOutputDirectory, `${locale}.json`);
            download(localeUrl).pipe(createWriteStream(localeOutputFile));
            return localeOutputFile;
        }))

        localeFiles.forEach(file => {
            console.log(` - ${file}`)
        });
    }

    private ensureFolderExist(folder: string) {
        if (!existsSync(folder)) {
            console.log(`Create [${folder}].`);
            mkdirSync(folder, {recursive: true});
        }
    }
}

const program = new Program(dataSourceDomain, outputFolder, supportedLocales);

program.run();
