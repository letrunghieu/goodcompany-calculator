import {createReducer, PayloadAction} from "@reduxjs/toolkit";
import {dataRequested} from "../../actions/actions";
import {IData} from "../../../models/IData";
import {isDistinct} from "../../../helpers/array";

type MaterialState = {
    selectedCategories: string[];
    searchQuery: string;
    sorter: string;
};

const initialState: MaterialState = {
    selectedCategories: [],
    searchQuery: '',
    sorter: 'name'
};

const materials = createReducer(initialState, {
    [dataRequested.fulfilled.type]: (state, action: PayloadAction<IData>) => ({...state, selectedCategories: extractCategories(action.payload)}),
});

function extractCategories(data: IData): string[] {
    const categoriesArray = data.materials.map(material => material.moduleCategory);

    return categoriesArray.filter(isDistinct);
}

export default materials;
