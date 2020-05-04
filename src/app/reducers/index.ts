import {combineReducers} from "redux";

import status from './status';
import data from './data';
import locales from './locales';

const reducer = combineReducers({status, data, locales});

export type RootState = ReturnType<typeof reducer>;

export default reducer;
