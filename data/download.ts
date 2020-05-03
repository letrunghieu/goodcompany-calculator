import {join} from 'path';
import {writeFileSync, mkdirSync, existsSync} from 'fs';
import fetch from 'node-fetch';
import download from 'download';
import {error, info} from "./libs/output";
import DataBuilder from "./libs/builders/DataBuilder";
import {IMaterials} from "./libs/models/responses/IMaterials";

const dataSourceDomain = "https://goodcompanygame.com";
const outputFolder = join(__dirname, 'output');
const supportedLocales = ['en', 'de', 'fr', 'es', 'pt', 'ru', 'ja', 'zh'];

class Program {
    private dataBuilder: DataBuilder;
    private readonly sourceUrlPrefix: string;
    private readonly localeUrlPrefix: string;
    private readonly iconUrlPrefix: string;

    constructor(
        private dataSourceDomain: string,
        private outputDirectory: string,
        private supportedLocales: string[],
    ) {
        this.sourceUrlPrefix = `${dataSourceDomain}/gamedata`;
        this.localeUrlPrefix = `${dataSourceDomain}/localization`;
        this.iconUrlPrefix = `${dataSourceDomain}/icons`;
        this.dataBuilder = new DataBuilder();
    }

    public async run(): Promise<void> {
        this.ensureOutputFolderExist();
        await this.downloadMaterial();
        await this.downloadLocaleFiles();
        await this.downloadImages();
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

            return download(localeUrl)
                .then(buffer => {
                    writeFileSync(localeOutputFile, buffer);

                    return localeOutputFile;
                });
        }))

        localeFiles.forEach(file => {
            console.log(` - ${file}`);
        });
    }

    private async downloadImages(): Promise<void> {
        console.log(info("Writing icon images ..."));

        const iconFolder = join(this.outputDirectory, 'icons');
        this.ensureFolderExist(iconFolder);

        const iconFiles = await Promise.all(Object.values(this.dataBuilder.getImages()).map(iconInfo => {
            const imageUrl = `${this.iconUrlPrefix}/${iconInfo.sprite}/${iconInfo.name}.png`
            const imageFolder = join(this.outputDirectory, 'icons', iconInfo.sprite);
            this.ensureFolderExist(imageFolder);

            const imageOutputFile = join(imageFolder, `${iconInfo.name}.png`);
            return download(imageUrl)
                .then(buffer => {
                    writeFileSync(imageOutputFile, buffer);
                    return imageOutputFile;
                })
                .catch(e => {
                    console.log(e.message);
                    console.log(error(` - ${imageUrl}`));

                    return '';
                });
        }));

        iconFiles.filter(file => file.length > 0).forEach(file => {
            console.log(` - ${file}`);
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
