import {combineReducers} from "redux";

import status from './status';

const reducer = combineReducers({status});

export type RootState = ReturnType<typeof reducer>;

export default reducer;
