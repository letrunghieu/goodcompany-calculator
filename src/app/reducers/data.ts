import {IData} from "../../models/IData";
import {createReducer, PayloadAction} from "@reduxjs/toolkit";
import {dataRequested} from "../actions/actions";

const initialState: IData = {
    version: '0',
    materials: [],
};

const data = createReducer(initialState, {
    [dataRequested.fulfilled.type]: (_, action: PayloadAction<IData>) => action.payload,
});

export default data;
