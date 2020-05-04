import React, {FunctionComponent} from "react";
import {useTranslation} from "react-i18next";

import {IMaterial} from "../../../models/IMaterial";
import {GAME_NAMESPACE} from "../../../helpers/i18n";
import GameIcon from "../commons/GameIcon";

type MaterialItemProps = {
    item: IMaterial
}

const MaterialItem: FunctionComponent<MaterialItemProps> = props => {
    const {item} = props;

    const {t} = useTranslation(GAME_NAMESPACE);

    return (
        <div>
            <GameIcon sprite={item.iconSprite} name={item.iconId} />
            {t(item.locaString)}
        </div>
    );
};

export default MaterialItem;
