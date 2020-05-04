import {createReducer} from "@reduxjs/toolkit";
import {pageInitiated} from "../actions/actions";

const initialState = {
    isDataLoaded: false,
    isLocaleLoaded: false,
};

const status = createReducer(initialState, {
    [pageInitiated.type]: state => state,
});

export default status;
