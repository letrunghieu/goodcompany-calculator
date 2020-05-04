import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import DataApi from "../../api/DataApi";
import LocalesApi from "../../api/LocalesApi";
import {initI18n} from "../../helpers/i18n";

const PAGE_INITIATED = 'PAGE_INITIATED';
const DATA_REQUESTED = 'DATA_REQUESTED';
const LOCALES_REQUESTED = 'LOCALES_REQUESTED';

export const pageInitiated = createAction(PAGE_INITIATED);

export const dataRequested = createAsyncThunk(
    DATA_REQUESTED,
    async () => {
        return await DataApi.instance.getData();
    },
);

export const localesRequested = createAsyncThunk(
    LOCALES_REQUESTED,
    async (locale: string) => {
        const locales = await LocalesApi.instance.getLocales(locale);

        initI18n(locales);

        return locales;
    },
);
