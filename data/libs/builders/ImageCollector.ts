interface IIconInfo {
    sprite: string;
    name: string;
}

export interface IImageDataCollection {
    [key: string]: IIconInfo;
}

class ImageCollector {
    private collection: IImageDataCollection = {};

    addImage(iconInfo: IIconInfo): void {
        const key = `${iconInfo.sprite}/${iconInfo.name}`;

        this.collection[key] = iconInfo;
    }

    getCollection(): IImageDataCollection {
        return this.collection;
    }
}

export default ImageCollector;
