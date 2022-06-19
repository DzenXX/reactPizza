import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {RootState} from "../store";
import {SortItem} from "../../pages/Home";


interface FetchPizzaArgs {
    currentPage: number,
    activeCategory: number,
    sortArr: SortItem[],
    selectedSort: number;
}

export const fetchPizzaItems = createAsyncThunk<PizzaItem[], FetchPizzaArgs>(
    'pizzas/fetchPizzas', async ({ currentPage, activeCategory, sortArr, selectedSort }) => {
        const { data } = await axios.get(
            `https://627f8941be1ccb0a466137de.mockapi.io/api/reactPizza/items?page=${currentPage}&limit=4&${activeCategory > 0 ? `category=${activeCategory}` : ''}&${sortArr[selectedSort] + '.param'}`
        );
        console.log("loading")
        return data as PizzaItem[]
    }
)

type PizzaItem = {
    id: string,
    title: string,
    price: number,
    imageUrl: string,
    sizes: number[],
    types: number[]
}

interface pizzaSliceState {
    status: 'loading' | 'success' | 'error',
    items: PizzaItem[]
}

let initialState: pizzaSliceState = {
    status: 'loading',
    items: []
}

let pizzasSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {

    },
    extraReducers: {
       [fetchPizzaItems.pending.type]: (state) => {
           console.log('Идет загрузка')
           state.status = 'loading'
           state.items = []
       },
       [fetchPizzaItems.rejected.type]: (state) => {
           console.log('Произошла ошибка')
           state.status = 'error'
       },
        [fetchPizzaItems.fulfilled.type]: (state, action) => {
            state.items = action.payload
            state.status = 'success'
            console.log('Загрузка успешно завершнена')
        },
    }
})

export const selectStatus = (state: RootState) => state.pizzas.status
export const selectItems = (state: RootState) => state.pizzas.items

export default pizzasSlice.reducer