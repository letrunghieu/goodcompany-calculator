import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {
    Container,
    CssBaseline,
    AppBar,
    Toolbar,
    Typography,
    Divider,
    IconButton,
    Hidden,
    Drawer, List, ListItem, ListItemIcon, ListItemText,
} from '@material-ui/core'
import {makeStyles} from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import BorderInnerIcon from '@material-ui/icons/BorderInner';
import GroupWorkIcon from '@material-ui/icons/GroupWork';

import './App.css';
import {dataRequested, localesRequested, pageInitiated} from "./app/actions/actions";
import {AppThunkDispatch} from "./app/store";
import {RootState} from "./app/reducers";
import LoadingPage from "./app/features/loading/LoadingPage";
import MaterialsListPage from "./app/features/materials/MaterialsListPage";

type StateProps = {
    isLoaded: boolean;
};

type DispatchProps = {
    onLoaded: () => void;
};

type AppProps = StateProps & DispatchProps;

function App(props: AppProps) {
    const classes = styles();
    const {isLoaded, onLoaded} = props;
    const [isDrawerOpened, setIsDrawerOpened] = useState(false);

    const handleDrawerToggle = () => {
        setIsDrawerOpened(!isDrawerOpened);
    }

    useEffect(() => {
        onLoaded();
    }, [onLoaded]);

    if (!isLoaded) {
        return (<LoadingPage />);
    }

    const drawerElement = (
        <div>
            <Toolbar variant={'dense'} />
            <Divider />
            <List>
                <ListItem button>
                    <ListItemIcon><BorderInnerIcon /></ListItemIcon>
                    <ListItemText primary={'Materials'} />
                </ListItem>
                <ListItem button>
                    <ListItemIcon><GroupWorkIcon /></ListItemIcon>
                    <ListItemText primary={'Equipments'} />
                </ListItem>
            </List>
        </div>
    );

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar className={classes.appBar}>
                <Toolbar variant={"dense"}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant={"h6"}>Good Company Calculator</Typography>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp>
                    <Drawer
                        variant="temporary"
                        anchor={'left'}
                        open={isDrawerOpened}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawerElement}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawerElement}
                    </Drawer>
                </Hidden>
            </nav>
            <div className={classes.content}>
                <Container maxWidth={false}>
                    <div className={classes.toolbar} />
                    <MaterialsListPage />
                </Container>
            </div>
        </div>
    );
}

const drawerWidth = 240;

const styles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    toolbar: theme.mixins.toolbar,
    appBar: {
        zIndex: theme.zIndex.drawer + 10,
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

function mapStateToProps(state: RootState): StateProps {
    return {
        isLoaded: state.status.isLocaleLoaded && state.status.isDataLoaded,
    }
}

function mapDispatchToProps(dispatch: AppThunkDispatch): DispatchProps {
    return {
        onLoaded: () => {
            dispatch(pageInitiated());
            dispatch(dataRequested());
            dispatch(localesRequested('en'));
        },
    }
}

const ConnectedApp = connect<StateProps, DispatchProps, {}, RootState>(mapStateToProps, mapDispatchToProps)(App);

export default ConnectedApp;
