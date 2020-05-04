import React, {useEffect} from 'react';
import {connect} from "react-redux";

import logo from './logo.svg';
import './App.css';
import {dataRequested, localesRequested, pageInitiated} from "./app/actions/actions";
import {AppThunkDispatch} from "./app/store";
import {RootState} from "./app/reducers";
import LoadingPage from "./app/features/loading/LoadingPage";

type StateProps = {
    isLoaded: boolean;
};

type DispatchProps = {
    onLoaded: () => void;
};

type AppProps = StateProps & DispatchProps;

function App(props: AppProps) {
    const {isLoaded} = props;

    useEffect(() => {
        props.onLoaded();
    }, []);

    if (!isLoaded) {
        return (<LoadingPage />);
    }

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

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
