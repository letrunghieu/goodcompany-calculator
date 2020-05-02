export interface IInputMaterial {
    iconSprite: string;
    iconID: string;
    locaString: string;
    materialID: number;
    materialAmount: number;
}

export interface IDataAmount {
    dataAmount: number;
    iconSprite: string;
    iconID: string;
    locaString: string;
    dataID: number;
}

export interface IModuleField {
    x: number;
    y: number;
}

export interface IModuleFeature {
    featureID: number;
    iconSprite: string;
    iconID: string;
    locaString: string;
    featureValue10: number;
}

export interface IMaterial {
    locaString: string;
    iconSprite: string;
    iconID: string;
    materialID: string;
    stackSize: number;
    stackBuyPrice: number;
    moduleID: number;
    moduleCategory: string;
    orderInCategory: number;
    inputMaterials: IInputMaterial[];
    outputAmount: number;
    sellPrice: number;
    samplingTime: number;
    dataAmounts: IDataAmount[];
    assemblyTime: number;
    moduleFields: IModuleField[];
    moduleFeatures: IModuleFeature[];
}
