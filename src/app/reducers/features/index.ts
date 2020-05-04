import {combineReducers} from "redux";

import materials from "./materials";

const features = combineReducers({
    materials,
});

export default features;
