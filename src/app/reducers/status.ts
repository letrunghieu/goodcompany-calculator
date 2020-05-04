import {createReducer} from "@reduxjs/toolkit";
import {dataRequested, localesRequested, pageInitiated} from "../actions/actions";

const initialState = {
    isDataLoaded: false,
    isLocaleLoaded: false,
};

const status = createReducer(initialState, {
    [pageInitiated.type]: state => state,
    [dataRequested.fulfilled.type]: state => ({ ...state, isDataLoaded: true}),
    [localesRequested.fulfilled.type]: state => ({ ...state, isLocaleLoaded: true}),
});

export default status;
