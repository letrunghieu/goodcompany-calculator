import {combineReducers} from "redux";

import status from './status';
import data from './data';
import locales from './locales';
import features from "./features";

const reducer = combineReducers({status, data, locales, features});

export type RootState = ReturnType<typeof reducer>;

export default reducer;
