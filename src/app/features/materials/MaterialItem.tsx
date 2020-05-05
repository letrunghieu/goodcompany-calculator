import React, {FunctionComponent} from "react";
import {useTranslation} from "react-i18next";
import {Paper, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

import {IMaterial} from "../../../models/IMaterial";
import {GAME_NAMESPACE} from "../../../helpers/i18n";
import GameIcon from "../commons/GameIcon";

type MaterialItemProps = {
    item: IMaterial
}

const MaterialItem: FunctionComponent<MaterialItemProps> = props => {
    const classes = styles();
    const {t} = useTranslation(GAME_NAMESPACE);

    const {item} = props;

    return (
        <Paper variant={'outlined'} square={true} className={classes.root}>
            <GameIcon sprite={item.iconSprite} name={item.iconId} />
            <Typography className={classes.text}>{t(item.locaString)}</Typography>
        </Paper>
    );
};

const styles = makeStyles(theme => ({
    root: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0.5),
    },
    text: {
        marginLeft: theme.spacing(1),
    },
}));

export default MaterialItem;
