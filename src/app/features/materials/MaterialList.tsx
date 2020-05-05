import React, {FunctionComponent, ReactComponentElement} from "react";
import {useTranslation} from "react-i18next";

import MaterialItem from "./MaterialItem";
import {GAME_NAMESPACE} from "../../../helpers/i18n";
import {IMaterialGroup} from "../../../models/IMaterial";
import {Divider, Grid, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

type MaterialListProps = {
    items: IMaterialGroup[]
};

const MaterialList: FunctionComponent<MaterialListProps> = props => {
    const classes = styles();
    const {t} = useTranslation(GAME_NAMESPACE);
    const {items} = props;

    const materialGroupsElements = items.map(group => {
        const materialElements = group.materials.map(
            item => (
                <Grid item xl={2} md={3} xs={12}>
                    <MaterialItem key={item.materialId} item={item} />
                </Grid>
            ),
        );
        return (
            <div key={group.group.moduleCategory} className={classes.group}>
                <div>
                    <Typography variant={'h6'} className={classes.heading}>{t(group.group.moduleCategory)}</Typography>
                </div>
                <Grid container spacing={1}>
                    {materialElements}
                </Grid>
            </div>
        );
    });

    const displayedElements: ReactComponentElement<any>[] = [];

    materialGroupsElements.forEach((element, index, elementsArray) => {
        displayedElements.push(element);

        if (index >= elementsArray.length - 1) {
            return;
        }

        displayedElements.push(<Divider key={`group-divider-${index}`}/>);
    });

    return (
        <div>
            {displayedElements}
        </div>
    );
};

const styles = makeStyles(theme => ({
    group: {
        marginBottom: theme.typography.fontSize,
    },
    heading: {
        marginTop: theme.typography.fontSize,
        marginBottom: theme.typography.fontSize * 0.3,
    }
}));

export default MaterialList;
