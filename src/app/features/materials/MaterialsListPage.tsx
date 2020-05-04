import React, {FunctionComponent} from "react";
import {connect} from "react-redux";
import {useTranslation} from "react-i18next";

import MaterialList from "./MaterialList";
import {IMaterial} from "../../../models/IMaterial";
import {RootState} from "../../reducers";
import {GAME_NAMESPACE} from "../../../helpers/i18n";

type MaterialsListPageStateProps = {
    materials: IMaterial[];
    locales: {
        [key: string]: string
    };
};

type MaterialsListPageProps = MaterialsListPageStateProps;

const MaterialsListPage: FunctionComponent<MaterialsListPageProps> = props => {
    const {materials, locales} = props;

    const {t} = useTranslation(GAME_NAMESPACE);

    const displayedMaterials = materials.map(material => ({...material, name: locales[material.locaString]}))
        .sort((a, b) => a.name.localeCompare(b.name));
    return (
        <div>
            <MaterialList items={displayedMaterials} />
        </div>
    );
};

function mapStateToProps(state: RootState): MaterialsListPageStateProps {
    return {
        materials: state.data.materials,
        locales: state.locales,
    }
}

export default connect<MaterialsListPageStateProps, {}, {}, RootState>(mapStateToProps)(MaterialsListPage);
