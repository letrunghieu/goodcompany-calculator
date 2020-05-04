// @see: https://www.reddit.com/r/goodcompany/comments/g1fhku/good_company_official_data_source/fnp9x21/
export interface IInputMaterial {
    icon_sprite: string;
    icon_id: string;
    loca_string: string;
    material_id: number;
    material_amount: number;
}

export interface IDataAmount {
    data_amount: number;
    icon_sprite: string;
    icon_id: string;
    loca_string: string;
    data_id: number;
}

export interface IModuleField {
    x: number;
    y: number;
}


export interface IModuleFeature {
    feature_id: number;
    icon_sprite: string;
    icon_id: string;
    loca_string: string;
    // Please note that in the data the feature values go from 0 - 100 and get devided by 10 when displayed in interfaces (0.0 - 10.0)
    feature_value: number;
}

export interface IMaterial {
    loca_string: string;
    icon_sprite: string;
    icon_id: string;
    material_id: string;
    stack_size: number;
    stack_buy_price: number;
    module_id: number;
    module_category: string;
    order_in_category: number;
    input_materials?: IInputMaterial[];
    output_amount: number;
    sell_price: number;
    sampling_time: number;
    data_amounts?: IDataAmount[];
    assembly_time: number;
    module_fields?: IModuleField[];
    module_features?: IModuleFeature[];
}

export interface IMaterials {
    version: string;
    materials: IMaterial[];
}
