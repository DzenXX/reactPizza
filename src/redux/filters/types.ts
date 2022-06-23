import {RootState} from "../store";

export const selectFilters = (state: RootState) => state.filters

export const selectActiveCategory = (state: RootState) => state.filters.activeCategory

export const selectSearchValue = (state: RootState) => state.filters.searchValue

export const selectSelectedSort = (state: RootState) => state.filters.selectedSort