import {createReducer, PayloadAction} from "@reduxjs/toolkit";
import {localesRequested} from "../actions/actions";

const initialState = {};

const locales = createReducer(initialState, {
    [localesRequested.fulfilled.type]: (_, action: PayloadAction<any>) => action.payload,
});

export default locales;
