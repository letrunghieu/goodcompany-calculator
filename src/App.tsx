import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {Action, Dispatch} from "redux";

import logo from './logo.svg';
import './App.css';
import {pageInitiated} from "./actions/actions";

type DispatchProps = {
    onLoaded: () => void;
};

type AppProps = DispatchProps;

function App(props: AppProps) {
    useEffect(() => {
        props.onLoaded();
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
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

function mapDispatchToProps(dispatch: Dispatch<Action<any>>): DispatchProps {
    return {
        onLoaded: () => {
            dispatch(pageInitiated())
        },
    }
}

const ConnectedApp = connect<{}, DispatchProps>(null, mapDispatchToProps)(App);

export default ConnectedApp;
