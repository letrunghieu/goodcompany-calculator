export interface IInputMaterial {
    iconSprite: string;
    iconId: string;
    locaString: string;
    materialId: number;
    materialAmount: number;
}

export interface IDataAmount {
    dataAmount: number;
    iconSprite: string;
    iconId: string;
    locaString: string;
    dataId: number;
}

export interface IModuleField {
    x: number;
    y: number;
}

export interface IModuleFeature {
    featureId: number;
    iconSprite: string;
    iconId: string;
    locaString: string;
    featureValue10: number;
}

export interface IMaterial {
    locaString: string;
    iconSprite: string;
    iconId: string;
    materialId: string;
    stackSize: number;
    stackBuyPrice: number;
    moduleId: number;
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
