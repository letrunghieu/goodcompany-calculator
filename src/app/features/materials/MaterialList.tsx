import React, {FunctionComponent} from "react";
import {IMaterial} from "../../../models/IMaterial";
import MaterialItem from "./MaterialItem";

type MaterialListProps = {
    items: IMaterial[];
};

const MaterialList:FunctionComponent<MaterialListProps> = props => {
    const {items} = props;
    const materialElements = items.map(item => (<MaterialItem key={item.materialId} item={item} />));
    return (
        <div>
            {materialElements}
        </div>
    );
};

export default MaterialList;
