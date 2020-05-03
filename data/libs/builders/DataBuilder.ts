import {IMaterial} from "../../../src/models/IMaterial";
import {IData} from "../../../src/models/IData";
import {IMaterials} from "../models/responses/IMaterials";
import ImageCollector, {IImageDataCollection} from "./ImageCollector";

class DataBuilder {
    private materials: IMaterial[] = [];
    private version: string = '';
    private imageCollector: ImageCollector;

    constructor() {
        this.imageCollector = new ImageCollector();
    }

    public getData(): IData {
        return {
            version: this.version,
            materials: this.materials,
        }
    };

    public addMaterialFromSource(materialsSource: IMaterials): void {
        this.version = materialsSource.version;

        this.materials = materialsSource.materials.map(material => ({
            locaString: material.loca_string,
            iconSprite: material.icon_sprite,
            iconId: material.icon_id,
            materialId: material.material_id,
            stackSize: material.stack_size,
            stackBuyPrice: material.stack_buy_price,
            moduleId: material.module_id,
            moduleCategory: material.module_category,
            orderInCategory: material.order_in_category,
            inputMaterials: material.input_materials ? material.input_materials.map(value => ({
                iconSprite: value.icon_sprite,
                iconId: value.icon_id,
                locaString: value.loca_string,
                materialId: value.material_id,
                materialAmount: value.material_amount,
            })) : [],
            outputAmount: material.output_amount,
            sellPrice: material.sell_price,
            samplingTime: material.sampling_time,
            dataAmounts: material.data_amounts ? material.data_amounts.map(value => ({
                dataAmount: value.data_amount,
                iconSprite: value.icon_sprite,
                iconId: value.icon_id,
                locaString: value.loca_string,
                dataId: value.data_id,
            })) : [],
            assemblyTime: material.assembly_time,
            moduleFields: material.module_fields ? material.module_fields.map(value => ({
                x: value.x,
                y: value.y
            })) : [],
            moduleFeatures: material.module_features ? material.module_features.map(value => ({
                featureId: value.feature_id,
                iconSprite: value.icon_sprite,
                iconId: value.icon_id,
                locaString: value.loca_string,
                featureValue10: value.feature_value,
            })): [],
        }));

        this.materials.forEach(material => {
            this.imageCollector.addImage({sprite: material.iconSprite, name: material.iconId});

            [
                material.inputMaterials,
                material.dataAmounts,
                material.moduleFeatures,
            ].forEach(collection => {
                collection.forEach((m: any) => {
                    this.imageCollector.addImage({sprite: m.iconSprite, name: m.iconId});
                });
            });
        });
    }

    public getImages(): IImageDataCollection {
        return this.imageCollector.getCollection();
    }
}

export default DataBuilder;
