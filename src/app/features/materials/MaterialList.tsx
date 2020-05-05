import React, {FunctionComponent} from "react";
import {useTranslation} from "react-i18next";

import MaterialItem from "./MaterialItem";
import {GAME_NAMESPACE} from "../../../helpers/i18n";
import {IMaterialGroup} from "../../../models/IMaterial";

type MaterialListProps = {
    items: IMaterialGroup[]
};

const MaterialList:FunctionComponent<MaterialListProps> = props => {
    const {items} = props;
    const {t} = useTranslation(GAME_NAMESPACE);

    const materialGroupsElements = items.map(group => {
        const materialElements = group.materials.map(item => (<MaterialItem key={item.materialId} item={item} />));
        return (
            <div key={group.group.moduleCategory}>
                <h4>{t(group.group.moduleCategory)}</h4>
                {materialElements}
            </div>
        );
    });

    return (
        <div>
            {materialGroupsElements}
        </div>
    );
};

export default MaterialList;
