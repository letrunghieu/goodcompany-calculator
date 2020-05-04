import {Action, configureStore, ThunkAction, ThunkDispatch} from "@reduxjs/toolkit";
import reducer, {RootState} from "./reducers";

const store = configureStore({reducer: reducer});

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export type AppThunkDispatch = ThunkDispatch<RootState, unknown, Action<string>>

export default store;
