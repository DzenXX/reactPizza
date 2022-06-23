import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {SetFiltersPayload} from "./selectors";

let filtersSlice = createSlice({
    name: 'filters',
    initialState: {
        searchValue: '',
        selectedSort: 0,
        activeCategory: 0,
        currentPage: 1
    },
    reducers: {
        setSearchValue: (state, action: PayloadAction<string>) => {
            console.log(action.payload)
            state.searchValue = action.payload
        },
        setSelectedSort: (state, action: PayloadAction<number>) => {
            state.selectedSort = action.payload
        },
        setActiveCategory: (state, action: PayloadAction<number>) => {
            state.activeCategory = action.payload
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload
        },
        setFilters: (state, action: PayloadAction<SetFiltersPayload>) => {
            state.currentPage = action.payload.currentPage
            state.activeCategory = action.payload.activeCategory
            state.selectedSort = action.payload.selectedSort
        }
    }
})

export const { setSelectedSort, setActiveCategory, setCurrentPage, setSearchValue, setFilters } = filtersSlice.actions

export default filtersSlice.reducer