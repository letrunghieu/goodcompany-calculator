import React, {FunctionComponent} from "react";
import {connect} from "react-redux";
import {useTranslation} from "react-i18next";

import MaterialList from "./MaterialList";
import {IMaterial, IMaterialGroup} from "../../../models/IMaterial";
import {RootState} from "../../reducers";
import {GAME_NAMESPACE} from "../../../helpers/i18n";
import {TFunction} from "i18next";

type MaterialsGroupsObject = {
    [group: string]: IMaterial[];
}
type MaterialsListPageStateProps = {
    materials: IMaterial[];
};

type MaterialsListPageProps = MaterialsListPageStateProps;

const MaterialsListPage: FunctionComponent<MaterialsListPageProps> = props => {
    const {materials} = props;

    const {t} = useTranslation(GAME_NAMESPACE);

    const displayedMaterials = sortMaterialsByCategory(materials, t);
    return (
        <div>
            <MaterialList items={displayedMaterials} />
        </div>
    );
};

function sortMaterialsByName(materials: IMaterial[], t: TFunction): IMaterialGroup[] {
    return [
        {
            group: {
                moduleCategory: 'all_materials',
            },
            materials: materials.map(material => ({...material, name: t(material.locaString)}))
                .sort((a, b) => a.name.localeCompare(b.name)),
        }
    ];
}

function sortMaterialsByCategory(materials: IMaterial[], t: TFunction): IMaterialGroup[] {
    const materialGroups = materials.reduce<MaterialsGroupsObject>((groups, item) => {
        groups[item.moduleCategory] = groups[item.moduleCategory] || [];
        groups[item.moduleCategory].push(item);

        return groups;
    }, {});

    const sortedGroupsByLocaleNames = Object.keys(materialGroups)
        .map(g => ({key: g, label: t(g)}))
        .sort((a, b) => a.label.localeCompare(b.label))
        .map(item => item.key);

    const results: IMaterialGroup[] = [];

    sortedGroupsByLocaleNames.forEach(group => {
        results.push({
            group: {
                moduleCategory: group,
            },
            materials: materialGroups[group].sort((a, b) => a.orderInCategory > b.orderInCategory ? 1 : a.orderInCategory < b.orderInCategory ? -1 : 0),
        });
    });

    return results;
}

function mapStateToProps(state: RootState): MaterialsListPageStateProps {
    return {
        materials: state.data.materials,
    }
}

export default connect<MaterialsListPageStateProps, {}, {}, RootState>(mapStateToProps)(MaterialsListPage);
