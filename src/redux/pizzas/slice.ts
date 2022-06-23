import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {FetchPizzaArgs, PizzaItem, pizzaSliceState, Status} from "./types";

export const fetchPizzaItems = createAsyncThunk<PizzaItem[], FetchPizzaArgs>(
    'pizzas/fetchPizzas', async ({ currentPage = 1, activeCategory = 0, selectedSort = 0 , sortArr= [
        {text: 'популярности', param: 'rating&order=desc', name: 'rating'},
        {text: 'цене', param: 'price&order=asc', name:'price'},
        {text: 'алфавиту', param: 'title&order=asc', name: 'title'}
    ]}) => {

        const { data } = await axios.get(
            `https://627f8941be1ccb0a466137de.mockapi.io/api/reactPizza/items?page=${currentPage}&limit=4&${activeCategory > 0 ? `category=${activeCategory}` : ''}&sortBy=${sortArr[selectedSort].param}`
        );
        console.log("loading")
        return data as PizzaItem[]
    }
)

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
            state.status = Status.LOADING
            state.items = []
        },
        [fetchPizzaItems.rejected.type]: (state) => {
            console.log('Произошла ошибка')
            state.status = Status.ERROR
        },
        [fetchPizzaItems.fulfilled.type]: (state, action) => {
            state.items = action.payload
            state.status = Status.SUCCESS
            console.log('Загрузка успешно завершнена')
        },
    }
})

export default pizzasSlice.reducer

