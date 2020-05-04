import React, {FunctionComponent} from "react";
import {CircularProgress} from '@material-ui/core';

type LoadingPageProps = {};

const LoadingPage: FunctionComponent<LoadingPageProps> = props => {
    return (
        <div className={'loading'}>
            <CircularProgress/>
        </div>
    );
}

export default LoadingPage;
