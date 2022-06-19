import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";



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
        }

    }
})

export const { setSelectedSort, setActiveCategory, setCurrentPage, setSearchValue } = filtersSlice.actions

export const selectFilters = (state: RootState) => state.filters

export const selectActiveCategory = (state: RootState) => state.filters.activeCategory

export const selectSearchValue = (state: RootState) => state.filters.searchValue

export const selectSelectedSort = (state: RootState) => state.filters.selectedSort

export default filtersSlice.reducer