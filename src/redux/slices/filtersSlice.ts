import {createSlice} from "@reduxjs/toolkit";


let filtersSlice = createSlice({
    name: 'filters',
    initialState: {
        searchValue: '',
        selectedSort: 0,
        activeCategory: 0,
        currentPage: 1
    },
    reducers: {
        setSearchValue: (state, action) => {
          state.searchValue = action.payload

        },
        setSelectedSort: (state, action) => {
            state.selectedSort = action.payload
        },
        setActiveCategory: (state, action) => {
            state.activeCategory = action.payload
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload
        }

    }
})

export const { setSelectedSort, setActiveCategory, setCurrentPage, setSearchValue } = filtersSlice.actions

export const selectFilters = (state) => state.filters

export const selectActiveCategory = (state) => state.filters.activeCategory

export const selectSearchValue = (state) => state.filters.searchValue

export const selectSelectedSort = (state) => state.filters.selectedSort

export default filtersSlice.reducer