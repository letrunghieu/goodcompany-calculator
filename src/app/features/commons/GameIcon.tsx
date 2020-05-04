import React, {FunctionComponent} from "react";

export type GameIconProps = {
    sprite: string;
    name: string;
};

const GameIcon: FunctionComponent<GameIconProps> = props => {
    const {sprite, name} = props;

    return (
        <img src={`/data/icons/${sprite}/${name}.png`} />
    );
};

export default GameIcon;
