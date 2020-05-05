import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {Container, CssBaseline, AppBar, Toolbar, Typography} from '@material-ui/core'

import './App.css';
import {dataRequested, localesRequested, pageInitiated} from "./app/actions/actions";
import {AppThunkDispatch} from "./app/store";
import {RootState} from "./app/reducers";
import LoadingPage from "./app/features/loading/LoadingPage";
import MaterialsListPage from "./app/features/materials/MaterialsListPage";
import {makeStyles} from "@material-ui/core/styles";

type StateProps = {
    isLoaded: boolean;
};

type DispatchProps = {
    onLoaded: () => void;
};

type AppProps = StateProps & DispatchProps;

function App(props: AppProps) {
    const {isLoaded, onLoaded} = props;
    const classes = styles();

    useEffect(() => {
        onLoaded();
    }, [onLoaded]);

    if (!isLoaded) {
        return (<LoadingPage />);
    }

    return (
        <div>
            <CssBaseline />
            <Container maxWidth={false}>
                <AppBar>
                    <Toolbar variant={"dense"}>
                        <Typography variant={"h6"}>Good Company Calculator</Typography>
                    </Toolbar>
                </AppBar>
                <div>
                    <div className={classes.toolbar} />
                    <MaterialsListPage />
                </div>
            </Container>
        </div>
    );
}

const styles = makeStyles(theme => ({
    toolbar: theme.mixins.toolbar,
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
