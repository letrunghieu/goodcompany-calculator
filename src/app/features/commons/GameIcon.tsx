import React, {FunctionComponent} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Typography} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import {GAME_NAMESPACE} from "../../../helpers/i18n";

export type GameIconProps = {
    sprite: string;
    name: string;
};

const GameIcon: FunctionComponent<GameIconProps> = props => {
    const classes = styles();

    const {sprite, name} = props;

    return (
        <img src={`/data/icons/${sprite}/${name}.png`} className={classes.image}/>
    );
};

const styles = makeStyles(theme => ({
    image: {
        width: theme.typography.fontSize * 4,
        height: theme.typography.fontSize * 4,
    }
}));

export default GameIcon;
