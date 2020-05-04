import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import DataApi from "../../api/DataApi";

const PAGE_INITIATED = 'PAGE_INITIATED';
const DATA_REQUESTED = 'DATA_REQUESTED';
const LOCALES_REQUESTED = 'LOCALES_REQUESTED';

export const pageInitiated = createAction(PAGE_INITIATED);
export const dataRequested = createAsyncThunk(
    DATA_REQUESTED,
    async () => {
        return await DataApi.instance.getData();
    }
)
